const express = require("express");
const { User, Block, Datetime, Code, Keyword } = require("../models"); //DB 가져오기
const { isLoggedIn } = require("./middlewares");
const router = express.Router();
const moment = require("moment");
const { Op, UUIDV4 } = require("sequelize");


//POST /insertday
router.post("/insertday", isLoggedIn, async (req, res, next) => {
  try {
    const curDate = req.body.curDate;
    const keyword = req.body.keyword;
    const isFinished = req.body.isFinished;
    const code = req.body.code;

    // 날짜 아이디.DatetimeId
    const dateInfo = await Datetime.findOne({    
      where : { fullDate : curDate},
      attributes : ["id"]
    });

    console.log('========?dateInfo',dateInfo)

     // Code 아이디 전체 가지고 오기 CodeName
    const codes = await Code.findAll({
      attributes: ['name']
    }); 


    // 하루 6블록 제작 ================ 
    const createBlock = async(codename) => {
      await Block.create({
        isFinished : "N",
        userId : req.user.userid,
        DatetimeId : dateInfo.id,
        CodeName : codename,
        // KeywordId : keywordId
      });
    };//createBlock

    const dayBlock = await Block.findAll({
      where : { 
        userId : req.user.userid,
        DateTimeId : dateInfo.id,
      },
      paranoid : false, 
    });

    if(dayBlock.length === 0){
      for(let i = 0; i < codes.length; i++){
        createBlock(codes[i].name);
      }
    }


    //키워드가 기존에 있는 경우 KeywordId
    const keywordInfo = await Keyword.findOne({   
      where: {
        keyword: keyword,
        userId: req.user.userid,
      },
      paranoid : false,           //deletedAt 조건 무시하고 검색.
      attributes: ['id'],
    });
    
    const createKeyword = async() => {
      const newKeyword = await Keyword.create({
        keyword : keyword,
        userId : req.user.userid
      });
      return newKeyword.id;
    }

    //업데이트======

    const updateBlock = async(codename,keywordId) => {
      await Block.update({
        KeywordId : keywordId,
        isFinished : isFinished
      },
      {
        where : {
          userId : req.user.userid,
          DateTimeId : dateInfo.id,
          Codename : codename
        },
        paranoid : false,
        
      })
    };//updateBlock


    if(keywordInfo){ 
      //기존에 있는 키워드
      updateBlock(code,keywordInfo.id)
    }else{
      //새로 만드는 키워드
      const keyId = await createKeyword();
      updateBlock(code,keyId);
    }

    res.status(200).send('ok');


  }catch(err){
    console.error(err);
    next(err);
  }
});

// POST /day 일 정보 
router.post("/day", isLoggedIn, async (req, res, next) => {
  try {
    const curDate = req.body.curDate;
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : '0'+ (today.getMonth() + 1) ;
    const day = (today.getDate()) >= 10 ? today.getDate() : '0' + today.getDate();

    console.log('curDate',curDate)
    console.log('${year}-${month}-${day}',`${year}-${month}-${day}`);

    // 날짜 아이디.DatetimeId
    const dateInfo = await Datetime.findOne({    
      where : { fullDate : curDate ? curDate : `${year}-${month}-${day}`},
      attributes : ["id"]
    });
    
    // Code 아이디 전체 가지고 오기 CodeName
    const codes = await Code.findAll({
      attributes: ['name']
    }); 
    
    const dayBlock = await Block.findAll({
      // raw : true,
      where : { 
        userId : req.user.userid,
        DateTimeId : dateInfo.id,
      },
      paranoid : false, 
      include : [{
        model : Keyword,
        attributes: ["keyword"]
      },{
        model : Datetime,
        attributes : ["fullDate"]
      },{
        model : Code,
        attributes : ["desc1","name"]
      }]
    });
    
    console.log('dayBlock',dayBlock)

    const result = {};

    result.type = "일간";
    result.curDate = curDate ? curDate : `${year}-${month}-${day}`;
    result.blockData = [];


    if(dayBlock.length === 0){
      for(let i = 0; i < codes.length; i++){
        const obj = {
          isFinished : 'N',
          Datetime : {
            fullDate :  curDate ? curDate : `${year}-${month}-${day}`,
          },
          Keyword : {
            keyword : '',
          },
          CodeName : codes[i].name
        }
        result.blockData.push(obj)
      }
      console.log("=1111111")
      return res.status(200).send(result);
    }else{
      result.blockData = dayBlock;      
      console.log("=222222")
      return res.status(200).send(result);
    }



    
  } catch (err) {
    console.error(err);
    next(err);
  }

});

module.exports = router;
