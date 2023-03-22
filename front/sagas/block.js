import axios from "axios";
import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import {
  INSERT_DAY_BLOCK_FAILURE,
  INSERT_DAY_BLOCK_REQUEST,
  INSERT_DAY_BLOCK_SUCCESS,
  LOAD_DAY_BLOCK_FAILURE,
  LOAD_DAY_BLOCK_REQUEST,
  LOAD_DAY_BLOCK_SUCCESS,
  LOAD_MONTH_BLOCK_FAILURE,
  LOAD_MONTH_BLOCK_REQUEST,
  LOAD_MONTH_BLOCK_SUCCESS,
  LOAD_WEEK_BLOCK_FAILURE,
  LOAD_WEEK_BLOCK_REQUEST,
  LOAD_WEEK_BLOCK_SUCCESS,
} from "../reducers/block";

//===============일 블록 조회
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

//===============주 블록 조회
function loadWeekBlockAPI(data) {
  return axios.post(`/block/week`, data);
}
function* loadWeekBlock(action) {
  try {
    const result = yield call(loadWeekBlockAPI, action.data);
    console.log("loadWeekBlockAPI result",result)
    yield put({
      type: LOAD_WEEK_BLOCK_SUCCESS,
      data : result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_WEEK_BLOCK_FAILURE,
      error: err.response.data,
    });
  }
}
//===============월 블록 조회
function loadMonyhBlockAPI(data) {
  return axios.post(`/block/month`, data);
}
function* loadMonthBlock(action) {
  try {
    // const result = yield call(loadMonyhBlockAPI, action.data);
    // console.log("loadMonyhBlockAPI result",result)
    yield put({
      type: LOAD_MONTH_BLOCK_SUCCESS,
      // data : result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MONTH_BLOCK_FAILURE,
      error: err.response.data,
    });
  }
}

//===============일 블록 등록
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
function* watchLoadWeekBlock() {
  yield takeLatest(LOAD_WEEK_BLOCK_REQUEST, loadWeekBlock);
}
function* watchLoadMonthBlock() {
  yield takeLatest(LOAD_MONTH_BLOCK_REQUEST, loadMonthBlock);
}
export default function* blockSaga() {
  yield all([fork(watchInsertDayBlock)]);
  yield all([fork(watchLoadDayBlock)]);
  yield all([fork(watchLoadWeekBlock)]);
  yield all([fork(watchLoadMonthBlock)]);
}
