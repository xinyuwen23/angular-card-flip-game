const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 4000;

const userRouter = require("./api/user");

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
