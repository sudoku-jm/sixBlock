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
        fullDate: curDate,
      },
    });

    //해당 날짜가 속해있는 weekid 와 같은 date들을 가져와서 배열을 만들어 주고 같은 날짜가 있으면 데이터 넣어주기. 
    const weekidArr = Datetime.findAll({
      where : {
        weekid : dateSeqObj.weekid
      }
    })

    returnData = weekidArr.map(dateObj => {
      const {id, fullDate, year, month, date, day, week, weekid} = dateObj
      const GetdateObj =  Block.findOne({
        where: {
          DatetimeId: id,
          userId: req.user.id,
        },
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });
      if (GetdateObj) {
        return GetdateObj;
      } else {
        return {
          id: "",
          isFinished: "",
          userId: "",
          DatetimeId: fullDate,
          CodeName: "",
          KeywordId: "",
        };
      }
    })
    // returnData = [
    //   ...dateArr,

    // ]

    return res.status(200).send(returnData);

    
  } catch (err) {
    console.error(err);
    next(err);
  }

});

module.exports = router;
