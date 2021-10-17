const express = require("express");
const router = express.Router();
const utils = require("utility");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const User = require("../models").User;
const Record = require("../models").Record;

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

router.get("/get", checkIfAuthenticated, (req, res) => {
  const token = getToken(req);
  if (!token) return res.json({ code: 1 });
  const userId = jwt.verify(token, RSA_PUBLIC_KEY).sub;
  User.findOne({ _id: userId }, (err, doc) => {
    const { _id, username, isAdmin } = doc;
    return res.json({ code: 0, user: { _id, username, isAdmin } });
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password: md5Password(password) }, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1 });
    }
    const userId = doc._id.toString();
    const jwtBearerToken = createJwtToken(userId);
    const { _id, username, isAdmin } = doc;
    return res.json({
      code: 0,
      user: { _id, username, isAdmin },
      idToken: jwtBearerToken,
      expiresIn: EXPIRESIN,
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
      const userId = doc._id.toString();
      const jwtBearerToken = createJwtToken(userId);
      const { _id, username, isAdmin } = doc;
      return res.json({
        code: 0,
        user: { _id, username, isAdmin },
        idToken: jwtBearerToken,
        expiresIn: EXPIRESIN,
      });
    });
  });
});

router.get("/all", (req, res) => {
  User.find({}, (err, doc) => {
    return res.json({ code: 0, users: doc });
  });
});

router.put("/update", (req, res) => {
  const { _id, username, password } = req.body;
  if (!username) {
    User.findOneAndUpdate(
      { _id },
      { password: md5Password(password) },
      (err, doc) => {
        if (!doc) {
          return res.json({ code: 1 });
        }
        return res.json({ code: 0 });
      }
    );
  } else if (!password) {
    User.findOneAndUpdate({ _id }, { username }, (err, doc) => {
      if (!doc) {
        return res.json({ code: 1 });
      }
      return res.json({ code: 0 });
    });
  } else {
    return res.json({ code: 1 });
  }
});

router.delete("/delete/:id", (req, res) => {
  const userId = req.params.id;
  User.findOneAndDelete({ _id: userId }, (err, doc) => {
    if (!doc) return res.json({ code: 1 });
    Record.deleteMany({ user: userId }, (err, doc) => {
      return res.json({ code: 0 });
    });
  });
});

module.exports = router;
