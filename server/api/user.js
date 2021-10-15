const express = require("express");
const router = express.Router();
const utils = require("utility");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const User = require("../models").User;

const RSA_PRIVATE_KEY = fs.readFileSync("./server/private.key");
const RSA_PUBLIC_KEY = fs.readFileSync("./server/public.key");

const EXPIRESIN = 60 * 60 * 24 * 7;

const md5Password = (password) => {
  const salt = "xkzrbCTPWeaV5z4p8mpxPpxyqVU7uq1l";
  return utils.md5(utils.md5(password + salt));
};

const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY,
  algorithms: ["RS256"],
});

function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

function createJwtToken(userId) {
  return jwt.sign({}, RSA_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: EXPIRESIN,
    subject: userId,
  });
}

router.get("/get", checkIfAuthenticated, getUser);

function getUser(req, res) {
  const token = getToken(req);
  if (!token) return res.json({ code: 1 });
  const userId = jwt.verify(token, RSA_PUBLIC_KEY).sub;
  User.findOne({ _id: userId }, (err, doc) => {
    return res.json({ code: 0, user: doc });
  });
}

router.post("/login", login);

function login(req, res) {
  const { username, password } = req.body;
  User.findOne({ username, password: md5Password(password) }, (err, doc) => {
    if (!doc) {
      return res.json({
        code: 1,
        message: "wrong password",
      });
    }
    const userId = doc._id.toString();
    const jwtBearerToken = createJwtToken(userId);
    return res.json({
      code: 0,
      user: doc,
      idToken: jwtBearerToken,
      expiresIn: EXPIRESIN,
    });
  });
}

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
      const userId = doc._id.toString();
      const jwtBearerToken = createJwtToken(userId);
      return res.json({
        code: 0,
        user: doc,
        idToken: jwtBearerToken,
        expiresIn: EXPIRESIN,
      });
    });
  });
});

module.exports = router;
