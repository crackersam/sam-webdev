const express = require("express");
const router = express.Router();
const protect = require("../middleware/AuthenticationMiddleware");
const {
  getMyPayments,
  createPaymentIntent,
  successfulPayment,
} = require("../controllers/PaymentController");

// @route   GET api/payments
// @desc    Get all payments for a user
// @access  Private
router.get("/", protect, getMyPayments);

// @route   POST api/payments/create-payment-intent
// @desc    Create a payment intent
// @access  Private
router.post(
  "/create-payment-intent",
  protect,
  createPaymentIntent
);

router.put(
  "/successful-payment",
  protect,
  successfulPayment
);

module.exports = router;
