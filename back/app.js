const express = require("express");

const db = require("./models");

const app = express();


db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);


app.get("/", (req, res) => {
  res.send("hi express");
});

app.listen(3306, () => {
  console.log("server test 🧨");
});
