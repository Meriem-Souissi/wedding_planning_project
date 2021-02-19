const mongoose = require("mongoose");

const OfferSchema = mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },

  image: String,
  offerTitle: String,
  offerSpecification: String,
  offerPrice: Number,
  offerExpires: Date,
});

module.exports = mongoose.model("offer", OfferSchema);
