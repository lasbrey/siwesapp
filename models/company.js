const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify');

const companySchema = new Schema({
  companyImage: {
    type: String
  },
  companyName: {
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
  slug: {
    type: String
  },
  companyDescrption: {
    type: String,
  },
  workers: {
    type: Object,
  },
  requests: {
    username: {
      type: String,
    },
  },
});


// Create company slug from the name
companySchema.pre('save', function(next) {
  this.slug = slugify(this.companyName, { lower: true, remove: /[*+~\/\\.()'"!:@]/g })
  next();
})

module.exports = mongoose.model("Company", companySchema);
