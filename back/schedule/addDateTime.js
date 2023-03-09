const schedule = require('node-schedule');
const {Datetime} = require("../models");
const getWeek = require('./getWeek');


module.exports = () => {
  schedule.scheduleJob('0 0 0 * * *', function () {   //24시 하루에 한 번 씩 날짜 하루씩 추가.

    Datetime.findOne({
      order: [['id', 'DESC']],
      attributes: ['fullDate']
    }).then(result => {
      console.log('가장 최근 날짜 :', result.fullDate);
      const dateString = result.fullDate;
      const [year, month, day] = dateString.split('-').map(Number);
      const nextDate = new Date(year, month - 1, day);
      nextDate.setDate(nextDate.getDate() + 1);

      setNewDate(nextDate);
    }).catch(err => {
      console.error('에러:', err);
    });
  });
}


function setNewDate(nextDate){
  const date = nextDate.getFullYear() + '-' + (nextDate.getMonth() + 1) + '-' + nextDate.getDate();
  const year = nextDate.getFullYear();
  const month = nextDate.getMonth() + 1;
  const day = nextDate.getDate();
  const week = getWeek(nextDate);  //몇 주차

  //Datetime 모델을 사용하여 새로운 데이터 생성

  Datetime.findOrCreate({
    where: { fullDate: date },
    defaults: {
      fullDate: date,
      year : year,
      month : month,
      day : day,
      week : week,
    },
  })
  .then((datetime,created) => {
    console.log(
      '추가된 날짜 컬럼 데이터 : ',
      'fullDate',date,
      'year' , year,
      'month',month,
      'day',day,
      'week', week
    )

    if(!created){
      Datetime.update(
        {
          fullDate: date,
          year : year,
          month : month,
          day : day,
          week : week,
        },
        { where: { fullDate: date } }
      );
    }

    console.log('Datetime 모델에 데이터 추가 완료!');
  })
  .catch(error => {
    console.error('Datetime 모델에 데이터 추가 실패:', error);
  });

}