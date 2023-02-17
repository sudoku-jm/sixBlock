const express = require("express");
const { User, Block } = require("../models"); //DB 가져오기
const router = express.Router();

router.post("/", async (req, res) => {
  await Block.create({
    type: req.body.type,
    typeNum: req.body.typeNum,
    day: req.body.day,
    date: req.body.date,
    isFinished: req.body.isFinished,
    keywordId: req.body.keywordId,
  });
  // res.json(); 
  res.send('ok')
});

module.exports = router;
