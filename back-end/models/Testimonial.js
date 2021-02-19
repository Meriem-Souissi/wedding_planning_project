const mongoose = require("mongoose");

const TestimonialSchema = mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },

  feedback: String,

  rate: Number,

  create__at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("testimonial", TestimonialSchema);
