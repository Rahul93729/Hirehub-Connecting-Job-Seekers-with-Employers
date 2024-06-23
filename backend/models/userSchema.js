import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Name must contain at least 3 character"],
      maxLength: [30, "Name connot exceed 30 character"],
    },
    email: {
      type: String,
      required: [true, "Please Provide youur name!"],
      validate: [validator.isEmail, "Please Provide a valid email"],
    },
    phone: {
      type: Number,
      required: [true, "Please provide your phone number"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: [3, "password must atleast of length 3"],
      maxLength: [30, "password connot exceed 30"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "please provide your role"],
      enum: ["Job Seeker", "Recruiter"],
    },
  },
  { timestamps: true }
);

// hashing password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate jwt token for auth.

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
