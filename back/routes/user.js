const express = require("express");
const { User } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt"); //비밀번호 암호화

//아이디 중복 체크
router.post("/duplicatechkid", async (req, res, next) => {
  // user/duplicatechkid
  try {
    const exUser = await User.findOne({
      where: {
        userid: req.body.userId,
      },
    });

    // res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.128:13000");
    //중복
    if (exUser) {
      res.status(201).json({
        duplicate: "Y",
      });
    }

    res.status(201).json({
      duplicate: "N",
    });
  } catch (error) {
    console.error(error);
    next(error); //statue(500) 500번 에러
  }
});

//회원가입
router.post("/", async (req, res, next) => {
  // user
  try {
    //기존 유저 아이디 여부 확인(아이디 중복검사)
    const exUser = await User.findOne({
      where: {
        userid: req.body.userId,
      },
    });

    //아이디 중복일 경우
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다.");
    }
    //비밀번호 암호화
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 12);
    await User.create({
      userid: req.body.userId,
      nickname: req.body.userNickName,
      password: hashedPassword,
    });

    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
