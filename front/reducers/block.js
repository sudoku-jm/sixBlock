import produce from "immer";
import { dayDummyData, dummyMonthList, weekDummyData } from "../dummy/dummyData";

const initialState = {
  getBlockLoading: false,
  getBlockDone: false,
  getBlockError: null,

  blockArr: [
    "Morning1",
    "Morning2",
    "Afternoon1",
    "Afternoon2",
    "Dinner1",
    "Dinner2",
  ],

  curDate: "2023-02-09",

  monthBlock: dummyMonthList,
  weekBlock: weekDummyData,

  dayBlock: dayDummyData,

  //dayblock 에서 날짜 선택 시 일정이 있는지 체크할 arr. 월별로 불러오기?
  dateArr: [
    "2023-02-01",
    "2023-02-04",
    "2023-02-05",
    "2023-02-07",
    "2023-02-08",
    "2023-02-10",
    "2023-02-13",
  ],
};

//일일 블록 체크(완료처리)
export const DAY_BLOCK_INPUT_CHECK = "DAY_BLOCK_INPUT_CHECK";
//일일 블록 체크 해제(미완료처리)
export const DAY_BLOCK_UNCHECK = "DAY_BLOCK_UNCHECK";

//일일 블록 데이터 가져오기(날짜 변경 시)
export const GET_DAY_BLOCK_REQUEST = "GET_DAY_BLOCK_REQUEST";
export const GET_DAY_BLOCK_SUCCESS = "GET_DAY_BLOCK_SUCCESS";
export const GET_DAY_BLOCK_FAIL = "GET_DAY_BLOCK_FAIL";

//일일 블록 변경
export const POST_DAY_BLOCK_REQUEST = "POST_DAY_BLOCK_REQUEST";
export const POST_DAY_BLOCK_SUCCESS = "POST_DAY_BLOCK_SUCCESS";
export const POST_DAY_BLOCK_FAIL = "POST_DAY_BLOCK_FAIL";

//일일
export const checkDayBlock = (dayType, seq, content) => {
  console.log("checkDayBlock", dayType, seq, content);
  return {
    type: DAY_BLOCK_INPUT_CHECK,
    data: {
      dayType,
      seq,
      content,
    },
  };
};
export const unCheckDayBlock = (dayType, seq) => {
  console.log("unCheckDayBlock", dayType, seq);
  return {
    type: DAY_BLOCK_UNCHECK,
    data: {
      dayType,
      seq,
    },
  };
};
export const getDayBlock = (date) => {
  console.log("getDayBlock", date);
  return {
    type: GET_DAY_BLOCK_REQUEST,
    date,
  };
};

//주간
export const handleDayBlock = (data) => {
  console.log("handleDayBlock", data);
  return {
    type: POST_DAY_BLOCK_REQUEST,
    data,
  };
};

//리듀서
const reducer = (state = initialState, action) => {
  console.log("block reducer :: ", state, action);
  //일일 블록 변경하기 : action.seq , action.content 넘겨받아서 찾아서 넣어주기
  return produce(state, (draft) => {
    //일일
    let curDayBlock, curDay;

    //주간
    let curDate;

    switch (action.type) {
      case DAY_BLOCK_INPUT_CHECK:
        console.log("DAY_BLOCK_INPUT_CHECK reducer");

        curDayBlock = draft.dayBlock.find(
          (day) => day.type === action.data.dayType
        );
        curDay = curDayBlock.blockData.find(
          (day) => day.seq === action.data.seq
        );
        curDay.content = action.data.content;
        curDay.isFinished = true;
        // return state
        break;

      case DAY_BLOCK_UNCHECK:
        console.log("DAY_BLOCK_UNCHECK reducer");
        curDayBlock = draft.dayBlock.find(
          (day) => day.type === action.data.dayType
        );
        curDay = curDayBlock.blockData.find(
          (day) => day.seq === action.data.seq
        );
        curDay.isFinished = false;
        // return state;
        break;

      case GET_DAY_BLOCK_REQUEST:
        console.log("GET_DAY_BLOCK_REQUEST reducer");
        draft.getBlockLoading = true;
        draft.getBlockDone = false;
        draft.getBlockError = false;
        break;
      case GET_DAY_BLOCK_SUCCESS:
        console.log("GET_DAY_BLOCK_SUCCESS reducer");
        draft.getBlockLoading = false;
        draft.getBlockDone = true;
        draft.getBlockError = false;
        break;
      case GET_DAY_BLOCK_FAIL:
        console.log("GET_DAY_BLOCK_FAIL reducer");
        draft.getBlockLoading = false;
        draft.getBlockDone = false;
        draft.getBlockError = true;
        break;

      case POST_DAY_BLOCK_REQUEST:
        console.log(">POST_DAY_BLOCK_REQUEST reducer");
        curDate = draft.weekBlock.find((week) => {
          console.log("=====================11111", week.day, action.data.day);
          return week.day === action.data.day;
        });
        curDay = curDate.weekData.find((day) => {
          console.log("==================22222", day.type, action.data.type);
          return day.type === action.data.type;
        });
        curDayBlock = curDay.blockData.find((day) => {
          console.log("======================33333", day.seq, action.data.seq);
          return day.seq === action.data.seq;
        });
        curDayBlock.content = action.data.content;
        curDayBlock.isFinished = action.data.isFinished;
        curDayBlock.regDate = new Date();

        break;
      default:
        return state;
    }
  });
};

export default reducer;
