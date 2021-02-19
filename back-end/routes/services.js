const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get wedding invitations
router.get("/wedding_invitations", (req, res) => {
  User.find(
    { speciality: "Wedding invitations" },
    { name: 1, avatar: 1, rating: 1 }
  )
    .then((user) => {
      let card = user.map((el) => {
        let rate = null;
        if (el.rating.length !== 0) {
          rate = el.rating.reduce((a, b) => a + b, 0) / el.rating.length;
        }
        return {
          _id: el._id,
          name: el.name,
          avatar: el.avatar,
          rating: rate,
        };
      });
      res.status(200).send(card);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//Get wedding venue
router.get("/wedding_venue", (req, res) => {
  User.find({ speciality: "Wedding venue" }, { name: 1, avatar: 1, rating: 1 })
    .then((user) => {
      let card = user.map((el) => {
        let rate = null;
        if (el.rating.length !== 0) {
          rate = el.rating.reduce((a, b) => a + b, 0) / el.rating.length;
        }
        return {
          _id: el._id,
          name: el.name,
          avatar: el.avatar,
          rating: rate,
        };
      });
      res.status(200).send(card);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//Get hair stylist
router.get("/hair_stylist", (req, res) => {
  User.find({ speciality: "Hair stylist" }, { name: 1, avatar: 1, rating: 1 })
    .then((user) => {
      let card = user.map((el) => {
        let rate = null;
        if (el.rating.length !== 0) {
          rate = el.rating.reduce((a, b) => a + b, 0) / el.rating.length;
        }
        return {
          _id: el._id,
          name: el.name,
          avatar: el.avatar,
          rating: rate,
        };
      });
      res.status(200).send(card);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

//Get photographers
router.get("/photographers", (req, res) => {
  User.find({ speciality: "Photographer" }, { name: 1, avatar: 1, rating: 1 })
    .then((user) => {
      let card = user.map((el) => {
        let rate = null;
        if (el.rating.length !== 0) {
          rate = el.rating.reduce((a, b) => a + b, 0) / el.rating.length;
        }
        return {
          _id: el._id,
          name: el.name,
          avatar: el.avatar,
          rating: rate,
        };
      });
      res.status(200).send(card);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ msg: "Server Error" });
    });
});

module.exports = router;
