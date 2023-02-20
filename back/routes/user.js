const express = require("express");
const { User, Block } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt"); //비밀번호 암호화
const passport = require("passport");

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

//로그인
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      //서버에러
      console.error(err);
      return next(err);
    }
    if (info) {
      //클라이언트 에러
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginerr) => {
      //req.login() 동작시 랜덤정보(쿠키) + 세션 연결 자동
      if (loginerr) {
        //패스포트쪽 로그인 에러
        console.error(loginerr);
        return next(loginerr);
      }

      //사용자 정보 찾기 , 사용자 추가 정보 더해서 줄 수 있음.
      console.log("user passport", user);

      //사용자 정보 비밀번호 제외 내려주기
      const fulluserWithoutPassword = await User.findOne({
        where: { userid: user.userid },
        attributes: {
          exclude: ["password", "updatedAt", "id", "createdAt"],
        },
        include: [
          {
            model: Block,
          },
        ],
      });

      return res.status(200).json(fulluserWithoutPassword); //로그인 성공      res에 cookie 정보를 함께 브라우저도 전달.
    });
  })(req, res, next);
});
module.exports = router;
