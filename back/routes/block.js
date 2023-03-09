const express = require("express");
const { User, Block, Datetime } = require("../models"); //DB 가져오기
const { isLoggedIn } = require("./middlewares");
const router = express.Router();
const moment = require("moment");


// POST /day 일 정보 
router.post("/day", isLoggedIn, async (req, res, next) => {
  try {
    let returnData = [];
    const curDate = req.body.curDate; //지금 입력한 날짜
    const m = moment(curDate);
  
    
    const dateSeqObj = await Datetime.findOne({
      where: {
        dateTimeId: curDate,
        userId : req.user.userid,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });
    
    const dateSeq = dateSeqObj.Datetime;  // dateSeq : []
    
    // const [block, created]  = await Block.findOrCreate({ 
    //   where: {
    //     dayId: dateSeq,
    //     userid : req.user.id, //middleware 에서 가져옴
    //   },
    //   defaults : {  //없을 시 기본적으로 작동
        
    //   }
    // });

    // if(!created){ //있을 시 작동

    // }

    const dateArr = await Block.findAll({
      where: {
        dayId: dateSeq,
        userid : req.user.id, //middleware 에서 가져옴
      },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
        include : [
          model : 
        ]
      },
    });

    if(dateArr){

    }
    returnData = [
      ...dateArr,

    ]

    // [
    //   {date : '2023-09-09', code : 'm1' , keyword : '운동' ,isFinished : 'Y'},
    //   {date : '2023-09-09', code : 'm2' , keyword : '운동' ,isFinished : 'Y'},
    //   {date : '2023-09-09', code : 'a1' , keyword : '운동' ,isFinished : 'Y'},
    //   {date : '2023-09-09', code : 'a2' , keyword : '운동' ,isFinished : 'Y'},
    //   {date : '2023-09-09', code : 'd1' , keyword : '운동' ,isFinished : 'Y'},
    //   {date : '2023-09-09', code : 'd2' , keyword : '운동' ,isFinished : 'Y'},
    // ]

    return res.status(200).send(returnData);

    
  } catch (err) {
    console.error(err);
    next(err);
  }

});

module.exports = router;
