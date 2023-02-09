import { all, fork, put, takeLatest } from "redux-saga/effects";
import { DAY_BLOCK_INPUT_CHECK, DAY_BLOCK_UNCHECK } from "../reducers/block";

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

/*saga 통합*/
function* watchBlock() {
  yield takeLatest(DAY_BLOCK_INPUT_CHECK, setDayBlockCheck);
  yield takeLatest(DAY_BLOCK_UNCHECK, setDayBlockUnCheck);
}

export default function* blockSaga() {
  yield all([fork(watchBlock)]);
}
