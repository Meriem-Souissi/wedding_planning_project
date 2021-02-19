const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const router = express.Router();
const User = require("../models/User");

//Add a rate value (id du personne à voter)
router.post("/:id", authMiddleware, (req, res) => {
  User.findById({ _id: req.params.id }, { rating: 1, speciality: 1 }).then(
    (user) => {
      user.rating.push(req.body.rate);
      rate = user.rating.reduce((a, b) => a + b, 0) / user.rating.length;
      let updatedRate = {
        _id: user._id,
        speciality: user.speciality,
        rating: rate,
      };
      user
        .save()
        .then(() => res.status(200).json(updatedRate))
        .catch((err) => {
          console.log(err.message);
          res.status(500).send({ msg: "Server Error" });
        });
    }
  );
});

module.exports = router;
