const express = require("express");
const { User, Block, PhotoProfile } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();
const bcrypt = require("bcrypt"); //비밀번호 암호화
const passport = require("passport");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { v4 } = require("uuid");

const defaultImagePath = "/img/noImg.svg";

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

//upload
const storage = multer.diskStorage({
  destination(req, file, done) {
    done(null, "uploads"); //uploads라는 폴더에 업로드.
  },
  filename(req, file, done) {
    const ext = path.extname(file.originalname); //확장자 추출 (png)
    const basename = path.basename(file.originalname, ext); //파일명.png
    done(null, v4() + Date.now() + ext); //파일명_123421424.png
  },
});
const fileFilter = (req, file, done) => {
  // 이미지 파일인지 확인
  if (file.mimetype.startsWith("image/")) {
    done(null, true);
  } else {
    // 이미지 파일이 아닐 경우 거부
    const error = new Error("이미지 파일만 업로드 가능합니다.");
    error.status = 400;
    done(error, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB
});

//아이디 중복 체크
router.post("/duplicatechkid", isNotLoggedIn, async (req, res, next) => {
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
router.post("/", isNotLoggedIn, async (req, res, next) => {
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
router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      //서버에러
      console.error("서버에러", err);
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
        console.error("패스포트쪽", loginerr);
        return next(loginerr);
      }

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
router.post("/logout", isLoggedIn, async (req, res) => {
  console.log("===========logout!!");
  req.logout((err) => {
    req.session.destroy();
    if (err) {
      res.redirect("/");
    } else {
      res.clearCookie("connect.sid");
      res.status(200).send("server ok: 로그아웃 완료");
    }
  });
});

//마이페이지 > 유저정보 더 불러오기
router.post("/userinfo", isLoggedIn, async (req, res, next) => {
  try {
    if (!req.user.userid) {
      return res.status(404).send("존재하지 않는 사용자입니다");
    }

    const plans = await Block.findAll({
      where: {
        UserId: req.user.userid, //middleware 에서 가져옴
      },
      attributes: {
        exclude: ["id", "type", "typeNum", "day", "date"],
      },
    });

    const userPhoto = await PhotoProfile.findOne({
      where: { userId: req.user.userid },
      attributes: ["src"],
    });

    //등록 된 프로필 이미지가 없을 경우
    let src = "";
    let srcYn = "";
    if (userPhoto == null) {
      src = path.posix.join(__dirname, "../../", defaultImagePath);
      srcYn = "N";
    } else {
      src = userPhoto.src;
      srcYn = "Y";
    }
    // console.log("============plans", plans);
    const finishedLen =
      plans.length > 0 ? plans.map((p) => p.isFinished == true).length : 0;
    const topKeyword = ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"];

    const result = {
      userid: req.user.userid,
      nickname: req.user.nickname,
      photoProfile: src,
      srcYn,
      plans: {
        totalPlans: plans.length,
        successRate:
          plans.length > 0
            ? parseInt((finishedLen / plans.length) * 100, 10)
            : 0, //성공개수/전체개수 * 100
        topKeywords: topKeyword,
      },
    };

    // console.log("=============result", result);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//유저 정보 수정
router.post("/modify", isLoggedIn, async (req, res, next) => {
  try {
    let result = {};

    //닉네임만 변경 시
    if (
      req.body.passwordBefore == "" ||
      req.body.passwordNew == "" ||
      req.body.passwordNewChk == ""
    ) {
      await User.update(
        {
          nickname: req.body.userNickname,
        },
        { where: { userid: req.user.userid } }
      );
      result.beforePwChk = "Y";
      result.nickname = req.body.userNickname;
      return res.status(200).json(result);
    } else {
      //비밀번호 업데이트
      if (req.body.passwordNew == req.body.passwordNewChk) {
        let pwChk = await bcrypt.compare(
          req.body.passwordBefore,
          req.user.password
        );
        if (pwChk) {
          const hashedPassword = await bcrypt.hash(req.body.passwordNew, 12);
          result.beforePwChk = "Y";
          console.log("==========okok!!");
          await User.update(
            {
              nickname: req.body.userNickname,
              password: hashedPassword,
            },
            { where: { userid: req.user.userid } }
          );
          return res.status(200).json(result);
        } else {
          result.beforePwChk = "N";
          return res.status(202).json(result);
        }
      }
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//유저 프로필 이미지 파일 등록
router.post( "/image",  isLoggedIn,  upload.single("image"),  async (req, res, next) => {
    console.log(req.file);
    res.status(200).json({
      state: 200,
      file: req.file,
    }); //어디로 업로드되었는지 프론트로 넘겨준다.
    try {
      const src = req.file.filename;

      const [img, created] = await PhotoProfile.findOrCreate({
        where: { userId: req.user.userid },
        defaults: {
          src: src,
        },
      });

      if (created) {
        //파일 새로 생성
        // await PhotoProfile.create({
        //   src: src,
        //   userId: req.user.userid,
        // });
      } else {
        // 이미 존재할 경우
        await PhotoProfile.update(
          {
            src: src,
          },
          { where: { userId: req.user.userid } }
        );
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

module.exports = router;

// try{
//   //이미지 추가
//   if(req.body.file){
//     const [img, created] = await PhotoProfile.findOrCreate({
//       where : { userId : req.user.userid },
//       defaults : {
//         src : req.body.file
//       }
//     });

//     if(created){
//         //파일 새로 생성
//     }else{
//       // 이미 존재할 경우
//       await PhotoProfile.update({
//         src : req.body.file,
//       },{where :
//         {userId : req.user.userid , }
//       });
//     }

//     const userPhoto = await PhotoProfile.findOne({
//       where : { userId : req.user.userid },
//       attributes : ["src"]
//     });

//     //등록 된 프로필 이미지가 없을 경우
//     let src = "";
//     let srcYn = ""
//     if(userPhoto == null) {
//       src = path.posix.join(__dirname,"../../", defaultImagePath);
//       srcYn = 'N';
//     }else{
//       src = userPhoto.src;
//       srcYn = "Y";
//     }

//     res.status(200).json({});

//   }
// }catch(err){
//   console.error(err);
//   next(err);
// }
