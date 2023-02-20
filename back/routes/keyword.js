const express = require("express");
const { User, Keyword } = require("../models"); //DB 가져오기
const router = express.Router();

router.post("/", async (req, res) => {
  await Keyword.create({
    
  });
  // res.json(); 
  res.send('ok')
});

module.exports = router;
