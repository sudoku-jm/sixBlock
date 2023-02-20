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
  } catch (err) {
    console.error(err);
    next(err); //statue(500) 500번 에러
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
  } catch (err) {
    console.error(err);
    next(err);
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

//로그아웃
router.post("/logout", async (req, res, next) => {
  console.log("===========logout!!");
  req.logout((err) => {
    req.session.destroy();
    if (err) {
      res.redirect("/");
    } else {
      res.status(200).send("server ok: 로그아웃 완료");
    }
  });
});

//마이페이지 > 유저정보 더 불러오기
router.post("/userinfo", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        userid: req.body.userid,
      },
      attributes: {
        exclude: ["password", "updatedAt", "id", "createdAt"],
      },
    });

    if (!user) {
      return res.status(404).send("존재하지 않는 사용자입니다");
    }

    const plans = await Block.findAll({
      where: {
        UserId: req.body.userid,
      },
      attributes: {
        exclude: ["id", "type", "typeNum", "day", "date"],
      },
    });
    console.log("============plans", plans);
    const finishedLen =
      plans.length > 0 ? plans.map((p) => p.isFinished == true).length : 0;
    const topKeyword = ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"];

    const result = {
      user,
      plans: {
        totalPlans: plans.length,
        successRate:
          plans.length > 0
            ? parseInt((finishedLen / plans.length) * 100, 10)
            : 0, //성공개수/전체개수 * 100
        topKeywords: topKeyword,
      },
    };

    console.log("=============result", result);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
