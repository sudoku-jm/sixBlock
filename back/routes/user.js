const express = require("express");
const { User, Block, PhotoProfile, Keyword } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();
const bcrypt = require("bcrypt"); //비밀번호 암호화
const passport = require("passport");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { v4 } = require("uuid");
const { Op } = require("sequelize");

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

//유저정보 불러오기
router.get('/', async (req, res,next) => {  //GET /user
  console.log('/user',req.headers);
  try {
    if(req.user){  
      const fullUserWithoutPassword = await User.findOne({
        where : { userid : req.user.userid },
        attributes : {
            exclude : ['password']
        },
        include : [{
          model : Block
        },
        ]
      });
      res.status(200).json(fullUserWithoutPassword);
    }else{
      res.status(200).json(null);
    }
  }catch(err){
    console.error(err);
    next(err);
  }
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
          exclude: ["password"],
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
  // req.logout((err) => {
  //   req.session.destroy();
  //   if (err) {
  //     res.redirect("/");
  //   } else {
  //     res.clearCookie("connect.sid");
  //     res.status(200).send("server ok: 로그아웃 완료");
  //   }
  // });
  req.logout();
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.status(200).json("server ok: 로그아웃 완료");
});

//마이페이지 > 유저정보 더 불러오기
router.post("/userinfo", isLoggedIn, async (req, res, next) => {
  try {
    if (!req.user.userid) {
      return res.status(404).send("존재하지 않는 사용자입니다");
    }

    const plans = await Block.findAll({
      raw : true,
      where: {
        UserId: req.user.userid, //middleware 에서 가져옴
        KeywordId : {
          [Op.not] : null       // 키워드 있는 것 만 
        }
      },
      attributes: ["isFinished","KeywordId"],
    });

    const userPhoto = await PhotoProfile.findOne({
      where: { userId: req.user.userid },
      attributes: ["src"],
    });

    
    // 사용자 프로필 src ================================================
    let src = "";
    let srcYn = "";
    if (userPhoto == null) {  //등록 된 프로필 이미지가 없을 경우
      src = path.posix.join(__dirname, "../../", defaultImagePath);
      srcYn = "N";
    } else {                  //프로필 있는 경우
      src = userPhoto.src;
      srcYn = "Y";
    }

    // 탑5 키워드 추출 ===================================================
    const myKeywords = plans.map((p) => p.KeywordId);
    const counts = {};
    //
    for (let i = 0; i < myKeywords.length; i++) {
      const element = myKeywords[i];   
      if (counts[element]) {            //기존에 있었다면 +1
        counts[element]++;              
      } else {    //첫 등장
        counts[element] = 1;            
      }
    }
    
    // 등장 횟수를 기준으로 내림차순으로 정렬.
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    // 상위 5개만 추출.
    const myKeywordSlice = sorted.slice(0,5);   // [ [ '키워드아이디', 횟수 ], [ '53', 2 ] ] 형태로 내려옴
    let top5 = [];
    for(let i = 0; i < myKeywordSlice.length; i++){

      const result = await Keyword.findOne({
        where: { id: myKeywordSlice[i][0] },
        attributes: ["keyword"],
      });

      top5.push({
        [`top${i + 1}`] : result.keyword,
        keyword : result.keyword,
        cnt : myKeywordSlice[i][1]
      });
      
    }
    console.log('top5??',top5)

    // const top5 = myKeywordSlice.map(([val, cnt], index) => ({
    //   [`top${index + 1}`] : val,
    //   count : cnt,
    // }) );
    
    // // 결과를 출력합니다.
    // console.log('top5',top5); 
    


    const finishedLen = plans.length > 0 ? plans.filter((p) => p.isFinished === 'Y').length : 0;    //완료 된 블록.
    const successPercent = plans.length > 0 ? ((finishedLen / plans.length) * 100).toFixed(1) : 0; // 성공개수/전체개수 * 100

    console.log('완료된 플랜 갯수',finishedLen)
    const result = {
      userid: req.user.userid,
      nickname: req.user.nickname,
      photoProfile: src,
      srcYn,
      plans: {
        totalPlans: plans.length,     //전체 블록 수
        finishedPlans : finishedLen,  //완료한 블록 수
        successRate : successPercent,  //성공개수/전체개수 * 100
        top5 : top5,            
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
      file: req.file.filename,
    }); //어디로 업로드되었는지 프론트로 넘겨준다.
    try {
      const src = req.file.filename;

      const [img, created] = await PhotoProfile.findOrCreate({
        where: { userId: req.user.userid },
        defaults: {   //기본 생성
          src: src,
        },
      });

      if (created) {
        //파일 새로 생성
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
