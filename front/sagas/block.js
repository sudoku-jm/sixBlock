import axios from "axios";
import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  INSERT_DAY_BLOCK_FAILURE,
  INSERT_DAY_BLOCK_REQUEST,
  INSERT_DAY_BLOCK_SUCCESS,
  LOAD_DAY_BLOCK_FAILURE,
  LOAD_DAY_BLOCK_REQUEST,
  LOAD_DAY_BLOCK_SUCCESS,
} from "../reducers/block";

//===============일 블록
//일 블록 불러오기
function loadDayBlockAPI(data) {
  return axios.post(`/block/day`, data);
}
function* loadDayBlock(action) {
  try {
    const result = yield call(loadDayBlockAPI, action.data);
    console.log("loadDayBlockAPI result",result)
    yield put({
      type: LOAD_DAY_BLOCK_SUCCESS,
      data : result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_DAY_BLOCK_FAILURE,
      error: err.response.data,
    });
  }
}

//===============일 블록
//일 블록 불러오기
function insertDayBlockAPI(data) {
  return axios.post(`/block/insertday`, data);
}
function* insertDayBlock(action) {
  try {
    yield call(insertDayBlockAPI, action.data);
    console.log("=========================loadDayBlockAPI");
    yield put({
      type: INSERT_DAY_BLOCK_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: INSERT_DAY_BLOCK_FAILURE,
      error: err.response.data,
    });
  }
}


function* watchInsertDayBlock() {
  yield takeLatest(INSERT_DAY_BLOCK_REQUEST, insertDayBlock);
}
function* watchLoadDayBlock() {
  yield takeLatest(LOAD_DAY_BLOCK_REQUEST, loadDayBlock);
}
export default function* blockSaga() {
  yield all([fork(watchInsertDayBlock)]);
  yield all([fork(watchLoadDayBlock)]);
}
