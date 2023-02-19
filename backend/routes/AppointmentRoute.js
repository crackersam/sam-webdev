const express = require("express");
const router = express.Router();
const {
  getAvailability,
  createAppointment,
  getMyAppointments,
  deleteAppointment,
} = require("../controllers/AppointmentController");
const auth = require("../middleware/AuthenticationMiddleware");

// @route GET api/appointments/availability
// @desc Gets availability
// @access Private
router.get("/available-times", auth, getAvailability);

// @route POST api/appointments/new-appointment
// @desc Creates a new appointment
// @access Private
router.post("/new-appointment", auth, createAppointment);

// @route GET api/appointments/my-appointments
// @desc Gets all appointments for a user
// @access Private
router.get("/my-appointments", auth, getMyAppointments);

// @route DELETE api/appointments/cancel-appointment
// @desc Cancels an appointment
// @access Private
router.delete(
  "/cancel-appointment",
  auth,
  deleteAppointment
);

module.exports = router;
