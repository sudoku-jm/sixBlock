const express = require("express");
const { User, Block, Datetime } = require("../models"); //DB 가져오기
const { isLoggedIn } = require("./middlewares");
const router = express.Router();
const moment = require("moment");

router.post("/day", isLoggedIn, async (req, res, next) => {
  try {
    let returnData = []
    const curDate = req.body.curDate;
    const m = moment(curDate);
    const dateSeqObj = await Datetime.findOne({
      where: {
        full_date: curDate,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });
    const dateSeq = dateSeqObj.Datetime;

    const dateArr = await Block.findAll({
      where: {
        dayId: dateSeq,
        userid : req.user.id, //middleware 에서 가져옴
      },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    returnData = [
      ...dateArr,

    ]

    return res.status(200).send(returnData);

    
  } catch (err) {
    console.error(err);
    next(err);
  }

});

module.exports = router;
