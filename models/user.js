const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    default: ''
  },
  admin: {
    type: Boolean,
    default: false,
  },
  recover : {
    type: String,
    default: ''
  },
  dob: {
    type: String,
    default: ''
  },
  salt: String,
  password: {
    type: String,
  },
});

userSchema
  .virtual("plainPassword")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

var User = mongoose.model("User", userSchema);
module.exports = User;
