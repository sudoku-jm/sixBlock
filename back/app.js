const express = require("express");
const UserRouter = require("./routes/user");
const db = require("./models");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hi express");
});

// 라우터 분리
app.use("/user", UserRouter);

app.listen(5500, () => {
  console.log("server test 🧨");
});
