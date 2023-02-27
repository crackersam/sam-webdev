const Payment = require("../models/PaymentModel");
const asyncHandler = require("express-async-handler");

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

module.exports = {
  getMyPayments,
};
