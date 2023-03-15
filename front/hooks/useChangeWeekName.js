export default (weekNum) => {
  const weekMap = {
    '1': '일',
    '2': '월',
    '3': '화',
    '4': '수',
    '5': '목',
    '6': '금',
    '7': '토',
  };

  const week = weekMap[weekNum.toString()];
  return week;
};
