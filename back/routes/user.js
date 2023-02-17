const express = require("express");
const { User } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt"); //비밀번호 암호화

// router.post("/", async (req, res, next) => {
//   try {
//     //기존 유저 아이디 여부 확인(아이디 중복검사)
//     const exUser = await User.findOne({
//       where: req.body.id,
//     });

//     //아이디 중복일 경우
//     if (exUser) {
//       return res.status(403).send("이미 사용 중인 아이디입니다.");
//     }
//     //
//     const
//   } catch (error) {
//     console.error(error);
//   }
// });

module.exports = router;
