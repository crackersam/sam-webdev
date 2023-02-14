const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Please authenticate.");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.clearCookie("token");
    res.clearCookie("verified");
    return res.status(401).json({ message: "Please authenticate." });
  }
});

module.exports = auth;
