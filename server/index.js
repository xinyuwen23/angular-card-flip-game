const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require("./api/user");
const recordRouter = require("./api/record");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/record", recordRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
