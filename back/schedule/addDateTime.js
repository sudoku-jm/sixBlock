const schedule = require('node-schedule');
const {Datetime} = require("../models");
const getWeek = require('./getWeek');

// 지금 시간 기준 5초 뒤
// const runTime = new Date(Date.now() + 5000);
const runTime = '0 0 0 * * *'

module.exports = () => {
    schedule.scheduleJob(runTime, function() {
    //24시 하루에 한 번 씩 날짜 하루씩 추가.
    // console.log('10초 뒤에 실행되었습니다!');

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
  const year = nextDate.getFullYear();
const month = String(nextDate.getMonth() + 1).padStart(2, '0');
const day = String(nextDate.getDate()).padStart(2, '0');  // ← 일자
const fullDate = `${year}-${month}-${day}`;               // ← YYYY-MM-DD
const dayOfWeek = nextDate.getDay();                      // ← 요일
const week = getWeek(nextDate);                           // ← 주차

const weekId = `${year}${String(week).padStart(2, '0')}`;


Datetime.findOrCreate({
  where: { fullDate },
  defaults: {
    fullDate,
    year: String(year),
    month,
    date: day,           // ✅ 일자 (01~31)
    day: dayOfWeek,      // ✅ 요일 (0~6)
    week,
    weekId,
    d_delYn: 'N',
  },
})
.then(async ([datetime, created]) => {
  console.log('추가된 날짜:', fullDate, 'created:', created);

  if (!created) {
    await Datetime.update(
      {
        year: String(year),
        month,
        date: day,
        day: dayOfWeek,
        week,
        weekId
      },
      { where: { fullDate } }
    );
    console.log('기존 날짜 업데이트 완료:', fullDate);
  } else {
    console.log('새 날짜 추가 완료:', fullDate);
  }
})
.catch(error => {
  console.error('날짜 추가 실패:', error);
});


}