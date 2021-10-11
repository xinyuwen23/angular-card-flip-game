const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 4000;

const userRouter = require("./api/user");

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
