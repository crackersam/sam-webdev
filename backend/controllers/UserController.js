const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const crypto = require("crypto");
const { sendWelcomeEmail, sendResetEmail } = require("../utils/sendMail");

const createUser = asyncHandler(async (req, res) => {
  const user = new User(req.body);
  user.forename = user.forename.toLowerCase();
  // convert all letters of forename to lowercase, except first letter  user.forename =
  user.forename =
    user.forename.charAt(0).toUpperCase() + user.forename.slice(1);

  const verificationToken = crypto.randomBytes(20).toString("hex");
  user.verificationToken = verificationToken;
  try {
    await user.save();
  } catch (err) {
    // Error handling for duplicate email address
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "It looks like you already have an account." });
    }
    // Error handling for misc validation errors
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: Object.values(err.errors)[0].message });
    }
    return res.status(400).json({ message: err.message });
  }

  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

  // sendWelcomeEmail(fullUrl, user.verificationToken, user.email, user.name);

  res
    .status(201)
    .json({ message: "Account created! Please verify your email address." });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    verificationToken: req.params.verificationToken,
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid verification token." });
  }
  user.verificationToken = undefined;
  await user.save();
  return res.status(200).json({ message: "Email verified!" });
});

const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid email address." });
  }
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiration = Date.now() + 24 * 60 * 60 * 1000;
  await user.save();
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  // sendResetEmail(fullUrl, resetToken, user.email, user.name);
  res.status(200).json({ message: "Password reset email sent." });
});

const setNewPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.resetToken,
    resetTokenExpiration: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({ message: "Invalid reset token." });
  }

  user.password = req.body.password;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;

  const token = await user.generateAuthToken();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  res.cookie("token", token, { expires, httpOnly: true });
  res.cookie("verified", "nothingHere!", { expires, httpOnly: false });

  try {
    await user.save();
  } catch (err) {
    // Error handling for misc validation errors
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: Object.values(err.errors)[0].message });
    }
    return res.status(400).json({ message: err.message });
  }
  return res.status(200).json({
    forename: user.forename,
    email: user.email,
    message: "Password reset successful. You are now logged in.",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  const token = await user.generateAuthToken();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  res.cookie("token", token, { expires, httpOnly: true });
  res.cookie("verified", "nothing here!", { expires, httpOnly: false });
  res
    .status(200)
    .json({ message: "You are now logged in as " + user.forename, user });
});

const logoutUser = asyncHandler(async (req, res) => {
  // get token from cookie called token
  const token = req.cookies.token;
  res.clearCookie("token");
  res.clearCookie("verified");
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== token;
    });
    await req.user.save();
    return res
      .status(200)
      .json({ message: req.user.forename + ", you are now logged out" });
  } catch (err) {
    return res.status(500).json({
      message:
        "Something went wrong when we tried to log you out. Please try again.",
    });
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { forename, email } = user;
  return res
    .status(200)
    .json({ message: `Welcome back, ${forename}!`, forename, email });
});

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getMe,
  verifyEmail,
  resetPassword,
  setNewPassword,
};
