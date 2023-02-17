import { all, fork, takeLatest } from "redux-saga/effects";
import { DAY_BLOCK_INPUT_CHECK, DAY_BLOCK_UNCHECK, GET_DAY_BLOCK_REQUEST, POST_DAY_BLOCK_REQUEST } from "../reducers/block";

/* 일일 block 세팅 */
function* setDayBlockCheck(action) {
  try {
    console.log("setdayblockcheck", action);
    // yield put({
    //   type: DAY_BLOCK_INPUT_CHECK,
    //   data: action.data
    // })
  } catch (error) {
    console.log("setDayBlockCheck error: ", error);
  }
}
function* setDayBlockUnCheck(action) {
  try {
    // yield put({
    //   type: DAY_BLOCK_UNCHECK,
    //   data: action.data,
    // });
  } catch (error) {
    console.log("setDayBlockCheck error: ", error);
  }
}

/* 일일 블록 불러오기 */
function getDayBlockAPI(data){
  //날짜 전달 > 일일 블록 데이터 가져오기
  //return axios.post("/block/day", data);
}
function* getDayBLockRequest(action){
  console.log("getDayBLockRequest", action)
  try{
    //const result = yield call(getDayBlockAPI, action.data);
    
  }catch(error){
    console.log("getDayBLockRequest error");
  }
}


//주간 
function postDayBlockAPI(data){
  //날짜 전달 > 일일 블록 데이터 저장
}
function* setWeekDayBlock (action) {
  console.log("setWeekDayBlock", action);
  try {
    //const result = yield call(getDayBlockAPI, action.data);
  } catch (error) {
    console.log("setWeekDayBlock error");
  }

}

/*saga 통합*/
function* watchBlock() {
  yield takeLatest(DAY_BLOCK_INPUT_CHECK, setDayBlockCheck);
  yield takeLatest(DAY_BLOCK_UNCHECK, setDayBlockUnCheck);

}
function* dayBlock(){  
  yield takeLatest(GET_DAY_BLOCK_REQUEST, getDayBLockRequest)
}

function* weekBlock(){  
  yield takeLatest(POST_DAY_BLOCK_REQUEST, setWeekDayBlock)
}

export default function* blockSaga() {
  yield all([fork(watchBlock), fork(dayBlock), fork(weekBlock)]);
}
