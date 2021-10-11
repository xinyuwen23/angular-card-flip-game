const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DB_URL =
  process.env.MONGODB_URI ||
  "mongodb+srv://xinyuwen:YsN61vioOdXzBeMr@cluster0.q0kbs.mongodb.net/angular-flip-card-game?retryWrites=true&w=majority";

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("user", userSchema);

exports.User = User;
