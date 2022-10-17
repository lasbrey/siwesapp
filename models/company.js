const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require('slugify');

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  Letter: String,
  slug: String,
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
  this.slug = slugify(this.name, { lower: true, remove: /[*+~\/\\.()'"!:@]/g })
  next();
})

module.exports = mongoose.model("Company", companySchema);
