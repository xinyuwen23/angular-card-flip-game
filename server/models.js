const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DB_URL =
  process.env.MONGODB_URI ||
  "mongodb+srv://xinyuwen:YsN61vioOdXzBeMr@cluster0.q0kbs.mongodb.net/angular-flip-card-game?retryWrites=true&w=majority";

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const recordSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    flips: { type: Number },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
const Record = mongoose.model("record", recordSchema);

exports.User = User;
exports.Record = Record;
