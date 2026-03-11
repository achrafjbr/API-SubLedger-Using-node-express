const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "MANAGER"],
      default: "USER",
    },
    password: {
      type: String,
      minLength: 5,
      maxLength: 256,
      trim: true,
      required: true,
    },
    
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
