const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    forename: {
      type: String,
      required: [true, "Please add a name"],
      minLength: [3, "Name must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please add an email address"],
      unique: true,
      validate: {
        validator: (value) => {
          if (!validator.isEmail(value)) {
            throw new Error("Please enter a valid email address");
          }
        },
      },
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    verificationToken: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    admin: {
      type: Boolean,
      default: false,
    },
    availability: [
      {
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "7 days",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

UserSchema.pre("save", function (next) {
  if (this.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);

  return next();
});

module.exports = User = mongoose.model("User", UserSchema);
