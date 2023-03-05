const dayjs = require("dayjs");
const User = require("../models/UserModel");
const Appointment = require("../models/AppointmentModel");
const asyncHandler = require("express-async-handler");

const allowedToCall = asyncHandler(async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      date: {
        $gte: dayjs().subtract(29, "minutes").toDate(),
        $lte: dayjs().add(29, "minutes").toDate(),
      },
      confirmed: true,
    }).populate("user");

    const admin = await User.findOne({
      admin: true,
      email: req.user.email,
    });

    if (
      appointment?.user?.email === req.user.email ||
      admin
    ) {
      return res
        .status(200)
        .json({ message: "Connecting..." });
    } else {
      throw new Error("Request an appointment first!");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const defaultExports = { allowedToCall };

module.exports = defaultExports;
