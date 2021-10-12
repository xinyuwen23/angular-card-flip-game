const express = require("express");
const router = express.Router();
const utils = require("utility");

const User = require("../models").User;

const md5Password = (password) => {
  const salt = "xkzrbCTPWeaV5z4p8mpxPpxyqVU7uq1l";
  return utils.md5(utils.md5(password + salt));
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password: md5Password(password) }, (err, doc) => {
    if (!doc) {
      return res.json({
        code: 1,
      });
    }
    return res.json({ code: 0, user: doc });
  });
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1 });
    }
    const user = new User({
      username,
      password: md5Password(password),
      isAdmin: false,
    });
    user.save((err, doc) => {
      return res.json({ code: 0, user: doc });
    });
  });
});

module.exports = router;
