const express = require("express");
const router = express.Router();
const auth = require("../middleware/AuthenticationMiddleware");
const {
  getListOfUsersAndAssets,
  downloadFile,
  updateAvailability,
  getAvailability,
  getAppointments,
  rejectAppointment,
  confirmAppointment,
} = require("../controllers/AdminController");

// @route GET api/admin/assets
// @desc Gets all assets
// @access Private
router.get("/assets", auth, getListOfUsersAndAssets);

// @route GET api/admin/assets/:filename
// @desc Downloads file
// @access Private
router.get("/assets/:filename", auth, downloadFile);

// @route PUT api/admin/availability
// @desc Updates availability
// @access Private
router.put("/availability", auth, updateAvailability);

// @route GET api/admin/availability
// @desc Gets availability
// @access Private
router.get("/availability", auth, getAvailability);

// @route GET api/admin/appointments
// @desc Gets appointments
// @access Private
router.get("/appointments", auth, getAppointments);

// @route PUT api/admin/appointments
// @desc Rejects appointment
// @access Private
router.delete("/appointments", auth, rejectAppointment);

// @route PUT api/admin/appointments
// @desc Approves appointment
// @access Private
router.put("/appointments", auth, confirmAppointment);

module.exports = router;
