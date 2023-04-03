const express = require("express");
const { Block, Datetime, Code, Keyword, Sequelize } = require("../models"); //DB 가져오기
const { isLoggedIn } = require("./middlewares");
const router = express.Router();


//POST DAY블록 추가 /insertday
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
      if(keyword !== ""){
        const keyId = await createKeyword();
        updateBlock(code,keyId);
      }else{
        updateBlock(code,null);

      }
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
      attributes : {
        exclude : ["KeywordId","DatetimeId","b_delYn","deletedAt","createdAt"],
      },
      order:[ 
          ['CodeName', 'DESC'],
          [Sequelize.literal(`CASE 
            WHEN CodeName = 'm1' THEN 1
            WHEN CodeName = 'm2' THEN 2
            WHEN CodeName = 'a1' THEN 3
            WHEN CodeName = 'a2' THEN 4
            WHEN CodeName = 'd1' THEN 5
            WHEN CodeName = 'd2' THEN 6
          END`), 'DESC']
        ],
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

      result.blockData.sort((a, b) => {
        const order = {m1: 1, m2: 2, a1: 3, a2: 4, d1: 5, d2: 6}
        return order[a.CodeName] - order[b.CodeName]
      })

      return res.status(200).send(result);
    }else{
      dayBlock.sort((a, b) => {
        const order = {m1: 1, m2: 2, a1: 3, a2: 4, d1: 5, d2: 6}
        return order[a.CodeName] - order[b.CodeName]
      })
      result.blockData = dayBlock;      
      return res.status(200).send(result);
    }

  } catch (err) {
    console.error(err);
    next(err);
  }

});


// POST /week 주 정보 
router.post("/week", isLoggedIn, async (req, res, next) => {
  try {
    const curDate = req.body.curDate;
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : '0'+ (today.getMonth() + 1) ;
    const day = (today.getDate()) >= 10 ? today.getDate() : '0' + today.getDate();

    const result = {};
    result.type = "주간";
    result.curDate = curDate ? curDate : `${year}-${month}-${day}`;
    result.blockData = [];
    
    //dateTimes 모델 : 해당 일자의 weekId, (year, month, week)가 같은 fullDate와, id를 가지고온다.(7개) 배열에 저장.
    const currentDate = await Datetime.findOne({    
      where : { fullDate : curDate ? curDate : `${year}-${month}-${day}`},
      attributes : ["weekId"]
    });

    const dateWeek = await Datetime.findAll({
      where : { weekid : currentDate.weekId },
      attributes : ["id","day","fullDate"] 
    }); 

    //배열 for문을 돌려 하루치 block을 가지고 온다. (datetimeid 1개당 block 6개씩)
    //block모델 : DatetimeId를 가지고 모든 데이터를 가지고 온다.
    const blocksBeforeObj = await Promise.all(dateWeek.map(async (date) => {
      const block = await Block.findAll({
        where: { 
          userId : req.user.userid,
          datetimeId: date.id 
        },
        paranoid : false, 
        attributes : {
          exclude : ["KeywordId","DatetimeId","b_delYn","deletedAt","createdAt","updatedAt","userId"],
        },
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
      const data = {
        day : date.day,
        date : date.fullDate,
        blocks : [...block]
      }
      return data;
    }));


    const createObj = async() => {
      const objs = []
      // Code 아이디 전체 가지고 오기 CodeName
      const codes = await Code.findAll({
        attributes: ['name']
      }); 

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
        objs.push(obj);
      }

      return objs;
    }

    for(let i = 0; i < blocksBeforeObj.length; i++){
      const obj = {};
      const week = blocksBeforeObj[i].day;
      const date = blocksBeforeObj[i].date;
      const blocks = blocksBeforeObj[i].blocks;
      //blocks이 없다면 가라데이터를 내려준다
      if(blocks.length === 0){
        obj.week = week;
        obj.date = date;
        obj.blocks = await createObj();
        obj.blocks.sort((a, b) => {
          const order = {m1: 1, m2: 2, a1: 3, a2: 4, d1: 5, d2: 6}
          return order[a.CodeName] - order[b.CodeName]
        })
        result.blockData.push(obj);
      }else{
        //blocks가 있다면 기존 데이터를 내려준다.
        obj.week = week;
        obj.date = date;
        obj.blocks = blocks;
        obj.blocks.sort((a, b) => {
          const order = {m1: 1, m2: 2, a1: 3, a2: 4, d1: 5, d2: 6}
          return order[a.CodeName] - order[b.CodeName]
        })

        result.blockData.push(obj);
      }
    }
    
    return res.status(200).send(result);
  } catch (err) {
    console.error(err);
    next(err);
  }

});

// POST /month 월 정보
router.post('/month', isLoggedIn, async (req, res, next) => {
  try{
    const curDate = req.body.curData;
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : '0'+ (today.getMonth() + 1) ;
    const day = (today.getDate()) >= 10 ? today.getDate() : '0' + today.getDate();

    const result = {};
    result.type = "월간";
    result.curDate = curDate ? curDate : `${year}-${month}-${day}`;
    result.blockData = [];

    //dateTime 모델 > 해당 월의 weeokId (202303)이 같은 데이터를 가지고 온다.
    // const currentDate = await Datetime.findOne({    
    //   where : { fullDate : curDate ? curDate : `${year}-${month}-${day}`},
    //   attributes : ["year","month"]
    // });


    // fullDate, id값 가지고 옴. (한달 치 데이터 들고 옴 30개 정도)
    const dateMonth = await Datetime.findAll({
      where : { 
        year : year,
        month : month,
      },
      attributes : ["id","day","fullDate"] 
    }); 

    console.log('dateMonth',dateMonth)

    //배열을 돌려 한 달 치 block을 가지고 온다. 
    //block에서 DatetimeId를 가지고 해당 날짜 블록 데이터를 다 가지고 온다.
    // block에 있는 데이터 : id, CodeName, isFinished 값 가지고 오기
    const montchBlocks = await Promise.all(dateMonth.map(async (date) => {
      const block = await Block.findAll({
        where: { 
          userId : req.user.userid,
          datetimeId: date.id 
        },
        paranoid : false, 
        attributes : {
          exclude : ["KeywordId","DatetimeId","b_delYn","deletedAt","createdAt","updatedAt","userId"],
        },
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

      block.sort((a, b) => {
        const order = {m1: 1, m2: 2, a1: 3, a2: 4, d1: 5, d2: 6}
        return order[a.CodeName] - order[b.CodeName]
      })
      const data = {
        date : date.fullDate, // 날짜
        blocks : [...block]
      }
      return data;
    }));

    result.blockData = montchBlocks;
    
    return res.status(200).send(result);
    

  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports = router;