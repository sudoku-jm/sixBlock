const express = require("express");
const cors = require("cors");
const UserRouter = require("./routes/user");
const BlockRouter = require("./routes/block");
const KeywordRouter = require("./routes/keyword");
const db = require("./models");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hi express");
});

// 라우터 분리
app.use("/user", UserRouter);
app.use("/block", BlockRouter);

app.listen(5500, () => {
  console.log("server test 🧨");
});
