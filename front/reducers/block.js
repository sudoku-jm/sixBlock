import produce from "immer";

const initialState = {
  //type
  blockType : "",
  //일 블록 가져오기
  getDayBlockLoading: false,
  getDayBlockDone: false,
  getDayBlockError: false,
  insertDayBlockLoading: false,
  insertDayBlockDone: false,
  insertDayBlockError: false,
  dayBlock : [],
  //주 블록 가져오기
  getWeekBlockLoading: false,
  getWeekBlockDone: false,
  getWeekBlockError: false,
  weekBlock : [],
  //월 블록 가져오기
  getMonthBlockLoading: false,
  getMonthBlockDone: false,
  getMonthBlockError: false,
  monthBlock : [],
  //블록 1개 추가 / 수정 / 삭제하기
  modifyDayBlockLoading: false,
  modifyDayBlockDone: false,
  modifyDayBlockError: false,

  blockArr: [
    "Morning1",
    "Morning2",
    "Afternoon1",
    "Afternoon2",
    "Dinner1",
    "Dinner2",
  ],
  dateArr: [],
  curDate: "",
};

//dayBlock
// const dummyDayBlock = {
//   type : "일간",
//   curDate : "2023-03-13",
//   blockData : [
//     { id : 1,  isFinished : 'N',  date : '2023-03-13',  keyword : '키워드1', code : 'm1'},
//   ],

// };

//일 블록 가져오기
export const LOAD_DAY_BLOCK_REQUEST = "LOAD_DAY_BLOCK_REQUEST";
export const LOAD_DAY_BLOCK_SUCCESS = "LOAD_DAY_BLOCK_SUCCESS";
export const LOAD_DAY_BLOCK_FAILURE = "LOAD_DAY_BLOCK_FAILURE";

export const INSERT_DAY_BLOCK_REQUEST = "INSERT_DAY_BLOCK_REQUEST";
export const INSERT_DAY_BLOCK_SUCCESS = "INSERT_DAY_BLOCK_SUCCESS";
export const INSERT_DAY_BLOCK_FAILURE = "INSERT_DAY_BLOCK_FAILURE";

//주 블록 가져오기
export const LOAD_WEEK_BLOCK_REQUEST = "LOAD_WEEK_BLOCK_REQUEST";
export const LOAD_WEEK_BLOCK_SUCCESS = "LOAD_WEEK_BLOCK_SUCCESS";
export const LOAD_WEEK_BLOCK_FAILURE = "LOAD_WEEK_BLOCK_FAILURE";
//월 블록 가져오기
export const LOAD_MONTH_BLOCK_REQUEST = "LOAD_MONTH_BLOCK_REQUEST";
export const LOAD_MONTH_BLOCK_SUCCESS = "LOAD_MONTH_BLOCK_SUCCESS";
export const LOAD_MONTH_BLOCK_FAILURE = "LOAD_MONTH_BLOCK_FAILURE";
//블록 1개 추가 / 수정 / 삭제하기
export const MODIFY_DAY_BLOCK_REQUEST = "MODIFY_DAY_BLOCK_REQUEST";
export const MODIFY_DAY_BLOCK_SUCCESS = "MODIFY_DAY_BLOCK_SUCCESS";
export const MODIFY_DAY_BLOCK_FAILURE = "MODIFY_DAY_BLOCK_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {

    switch (action.type) {
      //=================일 블록
      case INSERT_DAY_BLOCK_REQUEST:
        draft.insertDayBlockLoading = true;
        draft.insertDayBlockDone = false;
        draft.insertDayBlockError = null;
        break;
      case INSERT_DAY_BLOCK_SUCCESS:
        draft.insertDayBlockLoading = false;
        draft.insertDayBlockDone = true;
        break;
      case INSERT_DAY_BLOCK_FAILURE:
        draft.insertDayBlockLoading = false;
        draft.insertDayBlockDone = false;
        draft.insertDayBlockError = action.error;
        break;
      //=================일 블록
      case LOAD_DAY_BLOCK_REQUEST:
        draft.getDayBlockLoading = true;
        draft.getDayBlockDone = false;
        draft.getDayBlockError = null;
        break;
      case LOAD_DAY_BLOCK_SUCCESS:
        draft.getDayBlockLoading = false;
        draft.getDayBlockDone = true;
        draft.dayBlock = action.data.blockData;
        draft.blockType = action.data.type;
        draft.curDate = action.data.curDate;
        break;
      case LOAD_DAY_BLOCK_FAILURE:
        draft.getDayBlockLoading = false;
        draft.getDayBlockDone = false;
        draft.getDayBlockError = action.error;
        break;
      //================= 블록
      case LOAD_WEEK_BLOCK_REQUEST:
        draft.getWeekBlockLoading = true;
        draft.getWeekBlockDone = false;
        draft.getWeekBlockError = null;
        break;
      case LOAD_WEEK_BLOCK_SUCCESS:
        draft.getWeekBlockLoading = false;
        draft.getWeekBlockDone = true;
        draft.weekBlock = action.data;
        break;
      case LOAD_WEEK_BLOCK_FAILURE:
        draft.getWeekBlockLoading = false;
        draft.getWeekBlockDone = false;
        draft.getWeekBlockError = action.error;
        break;
      //=================월 블록
      case LOAD_MONTH_BLOCK_REQUEST:
        draft.getMonthBlockLoading = true;
        draft.getMonthBlockDone = false;
        draft.getMonthBlockError = null;
        break;
      case LOAD_MONTH_BLOCK_SUCCESS:
        draft.getMonthBlockLoading = false;
        draft.getMonthBlockDone = true;
        draft.monthBlock = action.data;
        break;
      case LOAD_MONTH_BLOCK_FAILURE:
        draft.getMonthBlockLoading = false;
        draft.getMonthBlockDone = false;
        draft.getMonthBlockError = action.error;
        break;
      //================= 블록 추가 / 수정 / 삭제
      case MODIFY_DAY_BLOCK_REQUEST:
        draft.modifyDayBlockLoading = true;
        draft.modifyDayBlockError = false;
        draft.modifyDayBlockError = null;
        break;
      case MODIFY_DAY_BLOCK_SUCCESS:
        draft.modifyDayBlockLoading = false;
        draft.modifyDayBlockError = true;
        draft.monthBlock = action.data;
        break;
      case MODIFY_DAY_BLOCK_FAILURE:
        draft.modifyDayBlockLoading = false;
        draft.modifyDayBlockError = false;
        draft.modifyDayBlockError = action.error;
        break;

      default:
        return state;
    }
  });
};

export default reducer;
