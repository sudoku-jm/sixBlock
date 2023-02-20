const express = require("express");
const { User, Block } = require("../models"); //DB 가져오기
const router = express.Router();

router.post("/", async (req, res) => {
  await Block.create({
    type: req.body.blockData.type,
    typeNum: req.body.blockData.typeNum,
    day: req.body.blockData.day,
    date: req.body.blockData.date,
    isFinished: req.body.blockData.isFinished,
    keywordId: req.body.blockData.keywordId,
  });
  // res.json(); 
  res.send('ok')
});

module.exports = router;
