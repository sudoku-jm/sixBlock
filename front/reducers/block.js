import produce from "immer";
import { dayDummyData, weekDummyData } from "../dummy/dummyData";

const initialState = {
  getBlockLoading: false,
  getBlockDone: false,
  getBlockError: null,

  curDate: "2023-02-09",
  monthBlock: [],
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

const reducer = (state = initialState, action) => {
  console.log("block reducer :: ", state, action);
  //일일 블록 변경하기 : action.seq , action.content 넘겨받아서 찾아서 넣어주기
  return produce(state, (draft) => {
    let curDayBlock;
    let curDay;

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

      default:
        return state;
    }
  });
};

export default reducer;
