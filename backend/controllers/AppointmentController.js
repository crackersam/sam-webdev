const User = require("../models/UserModel");
const Appointment = require("../models/AppointmentModel");

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
    await appointment.save();
    return res
      .status(201)
      .json({ message: "Appointment created." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAvailability,
  createAppointment,
};
