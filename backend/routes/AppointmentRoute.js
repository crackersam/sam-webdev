const express = require("express");
const router = express.Router();
const {
  getAvailability,
  createAppointment,
} = require("../controllers/AppointmentController");

// @route GET api/appointments/availability
// @desc Gets availability
// @access Private
router.get("/available-times", getAvailability);

// @route POST api/appointments/new-appointment
// @desc Creates a new appointment
// @access Private
router.post("/new-appointment", createAppointment);

module.exports = router;
