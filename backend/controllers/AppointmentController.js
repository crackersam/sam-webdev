const User = require("../models/UserModel");
const Appointment = require("../models/AppointmentModel");
const dayjs = require("dayjs");

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

const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment({
      user: req.user._id,
      date: req.body.date,
    });
    // check if appointment is available
    const otherAppointment = await Appointment.findOne({
      date: {
        $gte: dayjs(req.body.date)
          .subtract(29, "minutes")
          .toDate(),
        $lte: dayjs(req.body.date)
          .add(29, "minutes")
          .toDate(),
      },
    }).populate("user");
    if (
      otherAppointment?.user?.forename === req.user.forename
    ) {
      return res.status(400).json({
        message: "That slot is already booked by you.",
      });
    } else if (otherAppointment) {
      return res.status(400).json({
        message:
          "That slot is already booked, please select another.",
      });
    }
    await appointment.save();
    return res
      .status(201)
      .json({ message: "Appointment created." });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user._id,
    });
    return res.status(200).json({ appointments });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(
      req.body.id
    );
    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found." });
    }
    if (
      appointment.user.toString() !==
      req.user._id.toString()
    ) {
      return res
        .status(401)
        .json({ message: "Unauthorized." });
    }
    await appointment.remove();
    return res
      .status(200)
      .json({ message: "Appointment deleted." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAvailability,
  createAppointment,
  getMyAppointments,
  deleteAppointment,
};
