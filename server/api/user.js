const express = require("express");
const router = express.Router();
const utils = require("utility");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const User = require("../models").User;

const RSA_PRIVATE_KEY = fs.readFileSync("./server/private.key");
const RSA_PUBLIC_KEY = fs.readFileSync("./server/public.key");

const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY,
});

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
    const userId = doc._id;
    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 120,
      subject: userId,
    });
    return res.json({
      code: 0,
      user: doc,
      idToken: jwtBearerToken,
      expiresIn: 120,
    });
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
