const express = require("express");
const router = express.Router();

const Record = require("../models").Record;
const User = require("../models").User;

function sortRecords(records) {
  return records.sort((a, b) => {
    if (a.flips === b.flips) {
      return a.createdAt - b.createdAt;
    } else {
      return a.flips - b.flips;
    }
  });
}

router.get("/all", (req, res) => {
  Record.find({})
    .populate("user")
    .exec((err, doc) => {
      const records = sortRecords(doc).slice(0, 10);
      return res.json({ code: 0, records });
    });
});

router.post("/user", (req, res) => {
  const { _id } = req.body;
  Record.find({ user: _id })
    .populate("user")
    .exec((err, doc) => {
      const records = sortRecords(doc).slice(0, 10);
      return res.json({ code: 0, records });
    });
});

router.post("/upload", (req, res) => {
  const { _id, flips } = req.body;
  User.findOne({ _id }, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1 });
    }
    const record = new Record({
      user: _id,
      flips,
    });
    record.save((err, doc) => {
      return res.json({ code: 0, record: doc });
    });
  });
});

module.exports = router;
