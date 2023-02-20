const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  //로그인 시도 시
  passport.serializeUser((user, done) => {
    console.log("serializeUser 실행");
    done(null, user.id); //쿠키정보와 유저 아이디만 가져옴.
  });

  //로그인 시도 후
  passport.deserializeUser(async (id, done) => {
    try {
      //받은 아이디 또는 쿠키를 가지고 서버로 요청. DB에서 사용자 비교 후 데이터 복구해서 내려 줌.
      const user = await User.fineOne({ where: { id } });
      done(null, user); //req.user
    } catch (err) {
      console.error(err);
      done(err);
    }
  });

  local();
};
