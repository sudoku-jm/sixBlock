const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

const BlockRouter = require("./routes/block");
const UserRouter = require("./routes/user");
const KeywordRouter = require("./routes/keyword");
const db = require("./models");
const passportConfig = require("./passport");

const addDateTime = require("./schedule/addDateTime");
// env 파일 연결 들고오기
dotenv.config();

const app = express();
const PORT = 5500;

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);


  // 배치 프로그램
  // 24시에 실행될 함수
  addDateTime();
  
//패스포트 연결
passportConfig();

app.use(
  cors({
    origin: [process.env.FRONT_ACCESS_ARROW],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//쿠키
app.use(cookieParser(process.env.COOKIE_SECRET));
//세션
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hi express");
});

//==================라우터 분리===========
app.use("/block", BlockRouter);
8;
app.use("/user", UserRouter);

app.listen(PORT, () => {
  console.log("server test 🧨");
});
