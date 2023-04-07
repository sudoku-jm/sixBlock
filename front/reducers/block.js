import produce from "immer";

const initialState = {
  //type
  blockType : "일간",
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

  changeTypeDatesLoading : false,  //일블록 체인지 
  changeTypeDatesDone : false,
  changeTypeDatesError : false,
};

//dayBlock 더미데이터
// const dummyDayBlock = {
//   type : "일간",
//   curDate : "2023-03-12",
//   blockData : [
//     { id : 1,  isFinished : 'N',  date : '2023-03-12',  keyword : '키워드1', code : 'm1'},
//   ],

// };

//weekBlock 더미데이터
// const dummyWeekBlock = {
//   type : "주간",
//   curDate : "2023-03-12",
//   blockData : [
//     {
//       week:"1",
//       blocks:[
//         { id : 1, isFinished : 'N',  date : '2023-03-12', week:"1", keyword : '키워드1', code : 'm1'},
//         { id : 2, isFinished : 'N',  date : '2023-03-12', week:"1", keyword : '키워드2', code : 'm2'},
//         { id : 3, isFinished : 'N',  date : '2023-03-12', week:"1", keyword : '키워드3', code : 'a1'},
//         { id : 4, isFinished : 'N',  date : '2023-03-12', week:"1", keyword : '키워드4', code : 'a2'},
//         { id : 5, isFinished : 'N',  date : '2023-03-12', week:"1", keyword : '키워드5', code : 'd1'},
//         { id : 6, isFinished : 'N',  date : '2023-03-12', week:"1", keyword : '키워드6', code : 'd2'},
//       ]
//     },
//     {
//       week:"2",
//       blocks:[
//         { id : 7, isFinished : 'N',  date : '2023-03-13', week:"2", keyword : '키워드1', code : 'm1'},
//         { id : 8, isFinished : 'N',  date : '2023-03-13', week:"2", keyword : '키워드2', code : 'm2'},
//         { id : 9, isFinished : 'N',  date : '2023-03-13', week:"2", keyword : '키워드3', code : 'a1'},
//         { id : 10, isFinished : 'N',  date : '2023-03-13', week:"2", keyword : '키워드4', code : 'a2'},
//         { id : 11, isFinished : 'N',  date : '2023-03-13', week:"2", keyword : '키워드5', code : 'd1'},
//         { id : 12, isFinished : 'N',  date : '2023-03-13', week:"2", keyword : '키워드6', code : 'd2'},
//       ]
//     },
//     {
//       week:"3",
//       blocks:[
//         { id : 13, isFinished : 'N',  date : '2023-03-14', week:"3", keyword : '키워드1', code : 'm1'},
//     { id : 14, isFinished : 'N',  date : '2023-03-14', week:"3", keyword : '키워드2', code : 'm2'},
//     { id : 15, isFinished : 'N',  date : '2023-03-14', week:"3", keyword : '키워드3', code : 'a1'},
//     { id : 16, isFinished : 'N',  date : '2023-03-14', week:"3", keyword : '키워드4', code : 'a2'},
//     { id : 17, isFinished : 'N',  date : '2023-03-14', week:"3", keyword : '키워드5', code : 'd1'},
//     { id : 18, isFinished : 'N',  date : '2023-03-14', week:"3", keyword : '키워드6', code : 'd2'},
//       ]
//     },
//     {
//       week:"4",
//       blocks:[
       
//     { id : 19, isFinished : 'N',  date : '2023-03-15', week:"4", keyword : '키워드1', code : 'm1'},
//     { id : 20, isFinished : 'N',  date : '2023-03-15', week:"4", keyword : '키워드2', code : 'm2'},
//     { id : 21, isFinished : 'N',  date : '2023-03-15', week:"4", keyword : '키워드3', code : 'a1'},
//     { id : 22, isFinished : 'N',  date : '2023-03-15', week:"4", keyword : '키워드4', code : 'a2'},
//     { id : 23, isFinished : 'N',  date : '2023-03-15', week:"4", keyword : '키워드5', code : 'd1'},
//     { id : 24, isFinished : 'N',  date : '2023-03-15', week:"4", keyword : '키워드6', code : 'd2'},
//       ]
//     },
//     {
//       week:"5",
//       blocks:[
//         { id : 25, isFinished : 'N',  date : '2023-03-16', week:"5", keyword : '키워드1', code : 'm1'},
//         { id : 26, isFinished : 'N',  date : '2023-03-16', week:"5", keyword : '키워드2', code : 'm2'},
//         { id : 27, isFinished : 'N',  date : '2023-03-16', week:"5", keyword : '키워드3', code : 'a1'},
//         { id : 28, isFinished : 'N',  date : '2023-03-16', week:"5", keyword : '키워드4', code : 'a2'},
//         { id : 29, isFinished : 'N',  date : '2023-03-16', week:"5", keyword : '키워드5', code : 'd1'},
//         { id : 30, isFinished : 'N',  date : '2023-03-16', week:"5", keyword : '키워드6', code : 'd2'},
    
//       ]
//     },
//     {
//       week:"6",
//       blocks:[
//         { id : 31, isFinished : 'N',  date : '2023-03-17', week:"6", keyword : '키워드1', code : 'm1'},
//         { id : 32, isFinished : 'N',  date : '2023-03-17', week:"6", keyword : '키워드2', code : 'm2'},
//         { id : 33, isFinished : 'N',  date : '2023-03-17', week:"6", keyword : '키워드3', code : 'a1'},
//         { id : 34, isFinished : 'N',  date : '2023-03-17', week:"6", keyword : '키워드4', code : 'a2'},
//         { id : 35, isFinished : 'N',  date : '2023-03-17', week:"6", keyword : '키워드5', code : 'd1'},
//         { id : 36, isFinished : 'N',  date : '2023-03-17', week:"6", keyword : '키워드6', code : 'd2'},
//       ]
//     },
//     {
//       week:"7",
//       blocks:[
//         { id : 37, isFinished : 'N',  date : '2023-03-18', week:"7", keyword : '키워드1', code : 'm1'},
//     { id : 38, isFinished : 'N',  date : '2023-03-18', week:"7", keyword : '키워드2', code : 'm2'},
//     { id : 39, isFinished : 'N',  date : '2023-03-18', week:"7", keyword : '키워드3', code : 'a1'},
//     { id : 40, isFinished : 'N',  date : '2023-03-18', week:"7", keyword : '키워드4', code : 'a2'},
//     { id : 41, isFinished : 'N',  date : '2023-03-18', week:"7", keyword : '키워드5', code : 'd1'},
//     { id : 42, isFinished : 'N',  date : '2023-03-18', week:"7", keyword : '키워드6', code : 'd2'},
//       ]
//     },
//   ],

// };


// monthBlock 더미데이터
// const dummyMonthBlock = {
//   type : "월간",
//   curDate : "2023-03-22",
//   blockData : [
//     { 
//       date : '2023-03-22',
//       blocks : [
//         { id : 1, code : 'm1', isFinished : 'N'},
//         { id : 2, code : 'm2', isFinished : 'N'},
//         { id : 3, code : 'a1', isFinished : 'N'},
//         { id : 4, code : 'a2', isFinished : 'N'},
//         { id : 5, code : 'd1', isFinished : 'N'},
//         { id : 6, code : 'd2', isFinished : 'N'},
//       ]
//     },
//     { 
//       date : '2023-03-23',
//       blocks : [
//         { id : 7, code : 'm1', isFinished : 'N'},
//         { id : 8, code : 'm2', isFinished : 'N'},
//         { id : 9, code : 'a1', isFinished : 'N'},
//         { id : 10, code : 'a2', isFinished : 'N'},
//         { id : 11, code : 'd1', isFinished : 'N'},
//         { id : 12, code : 'd2', isFinished : 'N'},
//       ]
//     },
//   ],

// };

export const LOAD_USER_BLOCK_INFO_SUCCESS  = "LOAD_USER_BLOCK_INFO_SUCCESS";

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

//일 블록으로 체인지
export const CHANGE_TYPE_DATE_BLOCK_REQUEST = "CHANGE_TYPE_DATE_BLOCK_REQUEST";
export const CHANGE_TYPE_DATE_BLOCK_SUCCESS = "CHANGE_TYPE_DATE_BLOCK_SUCCESS";
export const CHANGE_TYPE_DATE_BLOCK_FAILURE = "CHANGE_TYPE_DATE_BLOCK_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {

    switch (action.type) {
      //=================유저 블록 정보
      case LOAD_USER_BLOCK_INFO_SUCCESS:
        draft.blockType = action.data == null ? "일간" : action.data;
        // draft.blockType = "일간";
        break;
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
        draft.dayBlock = [];
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
      //================= 주 블록
      case LOAD_WEEK_BLOCK_REQUEST:
        draft.getWeekBlockLoading = true;
        draft.getWeekBlockDone = false;
        draft.getWeekBlockError = null;
        draft.weekBlock = [];
        break;
      case LOAD_WEEK_BLOCK_SUCCESS:
        draft.getWeekBlockLoading = false;
        draft.getWeekBlockDone = true;
        draft.weekBlock = action.data.blockData;
        draft.blockType = action.data.type;
        draft.curDate = action.data.curDate;
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
        draft.monthBlock = [];
        break;
      case LOAD_MONTH_BLOCK_SUCCESS:
        draft.getMonthBlockLoading = false;
        draft.getMonthBlockDone = true;
        draft.monthBlock = action.data.blockData;
        draft.blockType = action.data.type;
        draft.curDate = action.data.curDate;
        // draft.monthBlock = dummyMonthBlock.blockData;
        
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
      //============== 원하는 블록 타입으로 변경
      case CHANGE_TYPE_DATE_BLOCK_REQUEST : 
        draft.changeTypeDatesLoading = true,
        draft.changeTypeDatesDone = false;
        draft.changeTypeDatesError = null;
        break;
      case CHANGE_TYPE_DATE_BLOCK_SUCCESS : 
        draft.changeTypeDatesLoading = false,
        draft.changeTypeDatesDone = true;
        draft.curDate = action.data.curDate;
        draft.blockType = action.data.blockType;
        break;
      case CHANGE_TYPE_DATE_BLOCK_FAILURE : 
        draft.changeTypeDatesLoading = false,
        draft.changeTypeDatesDone = false;
        draft.changeTypeDatesError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;