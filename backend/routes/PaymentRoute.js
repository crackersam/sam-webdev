const express = require("express");
const router = express.Router();
const protect = require("../middleware/AuthenticationMiddleware");
const {
  getMyPayments,
} = require("../controllers/PaymentController");

// @route   GET api/payments
// @desc    Get all payments for a user
// @access  Private
router.get("/", protect, getMyPayments);

module.exports = router;
