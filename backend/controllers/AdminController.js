const mongoose = require("mongoose");
const { Admin } = require("../models/UserModel");

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

module.exports = {
  downloadFile,
  getListOfUsersAndAssets,
  updateAvailability,
  getAvailability,
};
