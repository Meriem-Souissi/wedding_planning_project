const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  phone: Number,
  password: String,
  gender: String,
  category: String,
  speciality: String,
  avatar: String,
  address: String,
  proNumber: Number,
  facebook: String,
  twitter: String,
  instagram: String,
  youtube: String,

  rating: [
    {
      type: Number,
    },
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "comment",
    },
  ],

  offers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "offer",
    },
  ],

  images: [
    {
      type: mongoose.Types.ObjectId,
      ref: "image",
    },
  ],

  testimonials: [
    {
      type: mongoose.Types.ObjectId,
      ref: "testimonial",
    },
  ],

  created_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("user", UserSchema);
