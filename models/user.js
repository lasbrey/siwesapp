const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  photo: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
      type: String,
      default: "student",
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  verified: {
    type: String,
  },
  siwesCompany: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
