const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get a Professional Profil
router.get("/:id", (req, res) => {
  User.findById(
    { _id: req.params.id },
    {
      name: 1,
      avatar: 1,
      address: 1,
      proNumber: 1,
      facebook: 1,
      twitter: 1,
      instagram: 1,
      youtube: 1,
    }
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

module.exports = router;
