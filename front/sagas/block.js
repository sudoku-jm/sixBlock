import axios from "axios";
import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  LOAD_DAY_BLOCK_FAILURE,
  LOAD_DAY_BLOCK_REQUEST,
  LOAD_DAY_BLOCK_SUCCESS,
} from "../reducers/block";

//===============일 블록
//일 블록 불러오기
function loadDayBlockAPI(id) {
  return axios.get(`/block/${id}`);
}
function* loadDayBlock() {
  try {
    // const result = yield call(loadDayBlockAPI)
    // console.log("loadDayblockAPI result: ", result)
    console.log("=========================loadDayBlockAPI result");
    yield put({
      type: LOAD_DAY_BLOCK_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOAD_DAY_BLOCK_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadDayBlock() {
  yield takeLatest(LOAD_DAY_BLOCK_REQUEST, loadDayBlock);
}
export default function* blockSaga() {
  yield all([fork(watchLoadDayBlock)]);
}
