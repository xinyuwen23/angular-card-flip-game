const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const userRouter = require("./api/user");
const recordRouter = require("./api/record");

const PORT = process.env.PORT || 4000;

const app = express();

const buildPath = path.join(__dirname, "..", "dist/angular-card-flip-game");
app.use(express.static(buildPath));

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/record", recordRouter);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.json({ code: 1, message: "invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
