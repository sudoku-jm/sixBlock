const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userid",
        passwordField: "password",
      },
      async (userid, password, done) => {
        try {
          //1. 기존 유저가 있는지 검색. id로 검색.
          const user = await User.findOne({
            where: { userid },
          });
          //2. 사용자가 없다면 리턴
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 사용자입니다." });
          }

          //3.사용자가 있다면 : 기존 사용자 비번과 입력 비번 비교.
          const result = await bcrypt.compare(password, user.password);
          //true : id , password 일치
          if (result) {
            return done(null, user); //사용자 정보 전달.
          }

          //false
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (err) {
          //서버에러
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
