const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const acceptanceSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  }
});

module.exports = mongoose.model("Acceptance", acceptanceSchema);
