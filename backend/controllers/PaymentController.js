const Payment = require("../models/PaymentModel");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(
  "sk_test_51Mg6dlJcI06JXsQRwGGb7pVzu6a9PHFE7Kci4VpCC5AQ1NBqslC6pafY3hLjfadyqZCq3g5LRd0rKH0grzc2yrlZ00c12f3OcP"
);

const getMyPayments = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find({
      user: req.user._id,
    });
    if (!payments) {
      return res
        .status(404)
        .json({ message: "No payments found" });
    }
    return res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const createPaymentIntent = asyncHandler(
  async (req, res) => {
    try {
      const payment = await Payment.findOne({
        user: req.user._id,
        _id: req.body.paymentId,
      });
      if (!payment) {
        return res
          .status(404)
          .json({ message: "Payment not found" });
      }
      // Create a PaymentIntent with the order amount and currency

      const paymentIntent =
        await stripe.paymentIntents.create({
          amount: payment.amount * 100,
          currency: "gbp",
          automatic_payment_methods: {
            enabled: true,
          },
        });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

const successfulPayment = asyncHandler(async (req, res) => {
  try {
    const payment = await Payment.findOne({
      user: req.user._id,
      _id: req.body.paymentId,
    });
    if (!payment) {
      return res
        .status(404)
        .json({ message: "Payment not found" });
    }
    payment.paid = true;
    payment.paymentDate = Date.now();
    await payment.save();
    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getMyPayments,
  createPaymentIntent,
  successfulPayment,
};
