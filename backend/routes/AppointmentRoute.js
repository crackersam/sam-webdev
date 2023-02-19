const express = require("express");
const router = express.Router();
const {
  getAvailability,
} = require("../controllers/AppointmentController");

// @route GET api/appointments/availability
// @desc Gets availability
// @access Private
router.get("/available-times", getAvailability);

module.exports = router;
