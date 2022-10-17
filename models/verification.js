const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify');

const verificationSchema = new Schema({
  companyName: {
    type: String,
  },
  // slug: String,
  companyDescrption: {
    type: String,
  },
  workers: {
    type: String,
  },
  status: {
    type: String,
    default: "Pending"
  },
  Letter: String,
});

// Create company slug from the name
// verificationSchema.pre("save", function (next) {
//   this.slug = slugify(this.name, { lower: true, remove: /[*+~\/\\.()'"!:@]/g });
//   next();
// });

module.exports = mongoose.model("Verification", verificationSchema);
