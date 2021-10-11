const express = require("express");
const router = express.Router();
const utils = require("utility");

const User = require("../models").User;

const md5Password = (password) => {
  const salt = "xkzrbCTPWeaV5z4p8mpxPpxyqVU7uq1l";
  return utils.md5(utils.md5(password + salt));
};

router.get("/list", (req, res) => {
  User.find({}, (err, users) => {
    return res.json({ code: 0, users });
  });
});

router.get("/get_user", (req, res) => {
  const { _id } = req.cookies;
  if (!_id) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id }, (err, user) => {
    return res.json({ code: 0, user });
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
    res.cookie("_id", user._id);
    return res.json({ code: 0, user });
  });
});

// router.post("/register", (req, res) => {
//   const { email, name, password, isSeller } = req.body;
//   User.findOne({ email }, (err, doc) => {
//     if (doc) {
//       return res.json({ code: 1, message: "Email already exists" });
//     }
//     const user = new User({
//       email,
//       name,
//       password: md5Password(password),
//       isSeller,
//     });
//     user.save((err, doc) => {
//       const cart = new Cart({ user, price: 0, quantity: 0, items: [] });
//       cart.save((err, cart) => {
//         const { email, name, isSeller, _id } = doc;
//         const { user, price, quantity, items } = cart;
//         res.cookie("_id", _id);
//         return res.json({
//           code: 0,
//           user: { email, name, isSeller, _id },
//           cart: { user, price, quantity, items },
//           message: `Welcome, ${name}`,
//         });
//       });
//     });
//   });
// });

module.exports = router;
