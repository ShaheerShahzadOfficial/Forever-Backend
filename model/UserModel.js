const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLenght: [30, "Name Cannot exceed 30 Character"],
    minLenght: [5, "Name Should have Atleast 5 character"]
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter valid Email"]
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    validate: [validator.isStrongPassword, "Please Enter Strong Password"],
    minLenght: [8, "Password Should have Atleast 8 character"],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: "User"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
