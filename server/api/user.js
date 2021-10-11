const express = require("express");
const router = express.Router();
const utils = require("utility");

const User = require("../models").User;

const md5Password = (password) => {
  const salt = "xkzrbCTPWeaV5z4p8mpxPpxyqVU7uq1l";
  return utils.md5(utils.md5(password + salt));
};

router.get("/all", (req, res) => {
  User.find({}, (err, users) => {
    return res.json({ code: 0, users });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password: md5Password(password) }, (err, user) => {
    if (!user) {
      return res.json({
        code: 1,
      });
    }
    return res.json({ code: 0, user });
  });
});

router.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  User.findOne({ email }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1 });
    }
    const user = new User({
      email,
      name,
      password: md5Password(password),
      isAdmin: false,
    });
    user.save((err, user) => {
      return res.json({ code: 0, user });
    });
  });
});

module.exports = router;
