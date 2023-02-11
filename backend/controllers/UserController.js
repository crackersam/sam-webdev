const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

const createUser = asyncHandler(async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
  } catch (err) {
    // Error handling for duplicate email address
    if (err.code === 11000) {
      return res.status(400).send("It looks like you already have an account.");
    }

    // Error handling for misc validation errors
    if (err.name === "ValidationError") {
      return res.status(400).send(Object.values(err.errors)[0].message);
    }
  }

  const token = await user.generateAuthToken();

  // 30 days in milliseconds
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  // Set cookie
  res.cookie("token", token, { expires, httpOnly: true });
  // set verification cookie
  res.cookie("verified", user.verified, { expires, httpOnly: false });

  res.status(201).json({
    name: user.name,
    email: user.email,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  const token = await user.generateAuthToken();
  res.status(200).json({ ...user, token });
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
    res.status(200).send("Logged out");
  } catch (err) {
    res.status(400).send("Error logging out");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { name, email } = user;
  res.status(200).json({ name, email });
});

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getMe,
};
