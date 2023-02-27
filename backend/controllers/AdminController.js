const mongoose = require("mongoose");
const User = require("../models/UserModel");
const Appointment = require("../models/AppointmentModel");
const Document = require("../models/DocumentModel");
const Payment = require("../models/PaymentModel");
const asyncHandler = require("express-async-handler");

// init gfs
let gfs;
mongoose.connection.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(
    mongoose.connection.db,
    {
      bucketName: "assets",
    }
  );
});

const getListOfUsersAndAssets = async (req, res) => {
  if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: "Not authorized." });
  }
  try {
    const users = await User.find();
    const UsersAndFilesList = [];
    for (const user of users) {
      const files = await gfs
        .find({ "metadata.uploader": user._id })
        .toArray();
      const rawFilenames = files.map(
        (file) => file.filename
      );
      UsersAndFilesList.push({ user, rawFilenames });
    }

    return res.status(200).json({ UsersAndFilesList });
  } catch (err) {
    console.error(err);
  }
};

const downloadFile = async (req, res) => {
  if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: "Not authorized." });
  }
  try {
    const file = await gfs
      .find({
        filename: req.params.filename,
      })
      .toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({
        message: "No file available",
      });
    }
    const readStream = gfs.openDownloadStreamByName(
      req.params.filename
    );
    readStream.pipe(res);
  } catch (err) {
    console.error(err);
  }
};

const updateAvailability = async (req, res) => {
  if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: "Not authorized." });
  }
  try {
    const admin = await User.findOne({ admin: true });
    const d1 = new Date(req.body[0]);
    const d2 = new Date(req.body[1]);
    if (
      req.body.length !== 2 ||
      !(d1 instanceof Date) ||
      !(d2 instanceof Date)
    ) {
      throw new Error("Invalid availability.");
    }

    admin.availability = req.body;

    admin.save();
    return res
      .status(200)
      .json({ message: "Availability updated." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAvailability = async (req, res) => {
  if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: "Not authorized." });
  }
  try {
    const admin = await User.findOne({ admin: true });
    if (admin.availability.length !== 2) {
      throw new Error("No availability set.");
    }

    return res
      .status(200)
      .json({ availability: admin.availability });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAppointments = async (req, res) => {
  if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: "Not authorized." });
  }
  try {
    const appointments = await Appointment.find().populate(
      "user"
    );
    return res.status(200).json({ appointments });
  } catch (err) {
    console.error(err);
  }
};

const rejectAppointment = async (req, res) => {
  if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: "Not authorized." });
  }
  try {
    const appointment = await Appointment.findById(
      req.body.id
    );
    if (!appointment) {
      return res
        .status(404)
        .json({ message: "No appointment found." });
    }
    await appointment.remove();

    return res
      .status(200)
      .json({ message: "Appointment rejected." });
  } catch (err) {
    console.error(err);
  }
};

const confirmAppointment = async (req, res) => {
  if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: "Not authorized." });
  }
  try {
    const appointment = await Appointment.findById(
      req.body.id
    );

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "No appointment found." });
    }
    appointment.confirmed = true;
    await appointment.save();
    return res
      .status(200)
      .json({ message: "Appointment confirmed." });
  } catch (err) {
    console.error(err);
  }
};

const getDocuments = asyncHandler(async (req, res) => {
  if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: "Not authorized." });
  }
  try {
    const documents = await Document.find().populate(
      "user"
    );

    const articlesByAuthor = {};

    // Use a for...of loop to iterate over each document in the array
    for (const doc of documents) {
      // Get the author's email address from the document
      const email = doc.user.email;

      // If we haven't seen this author before, add them to the object with an empty array of articles
      if (!articlesByAuthor[email]) {
        articlesByAuthor[email] = [];
      }

      // Add the current document to the author's array of articles
      articlesByAuthor[email].push({
        title: doc.title,

        body: doc.body,
      });
    }

    // Create an array of author objects from the articlesByAuthor object
    const docs = [];

    for (const email in articlesByAuthor) {
      docs.push({ [email]: articlesByAuthor[email] });
    }

    return res.status(200).json({ docs });
  } catch (err) {
    console.error(err);
  }
});

const createPayment = asyncHandler(async (req, res) => {
  if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: "Not authorized." });
  }
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found." });
    }
    const payment = await new Payment({
      user: user._id,
      order: req.body.order,
      amount: req.body.amount,
    });
    await payment.save();
    return res
      .status(200)
      .json({ message: "Payment created." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getPayments = asyncHandler(async (req, res) => {
  if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: "Not authorized." });
  }
  try {
    const payments = await Payment.find().populate("user");
    const users = await User.find();

    const paymentsByUser = {};
    for (user of users) {
      paymentsByUser[user.email] = [];
    }
    for (const payment of payments) {
      const email = payment.user.email;
      paymentsByUser[email].push({
        order: payment.order,
        amount: payment.amount,
        paid: payment.paid,
        id: payment._id,
      });
    }
    const pay = [];
    for (const email in paymentsByUser) {
      pay.push({ [email]: paymentsByUser[email] });
    }

    return res.status(200).json({ pay });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const deletePayment = asyncHandler(async (req, res) => {
  if (!req.user.admin) {
    return res
      .status(401)
      .json({ message: "Not authorized." });
  }
  try {
    const payment = await Payment.findById(req.body.id);
    if (!payment) {
      return res
        .status(404)
        .json({ message: "No payment found." });
    }
    if (payment.paid) {
      return res
        .status(400)
        .json({ message: "Payment already paid." });
    }
    await payment.remove();

    return res
      .status(200)
      .json({ message: "Payment deleted." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = {
  downloadFile,
  getListOfUsersAndAssets,
  updateAvailability,
  getAvailability,
  getAppointments,
  rejectAppointment,
  confirmAppointment,
  getDocuments,
  createPayment,
  getPayments,
  deletePayment,
};
