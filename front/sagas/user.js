import { all, fork, put, takeLatest, call, delay } from "redux-saga/effects";
import axios from "axios";
import {
  DUPLICATE_CHECK_ID_FAILRE,
  DUPLICATE_CHECK_ID_REQUEST,
  DUPLICATE_CHECK_ID_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  LOAD_USER_INFO_REQUEST,
  LOAD_USER_INFO_SUCCESS,
  LOGOUT_FAILRE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOG_IN_FAILRE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  MODIFY_USER_FAILRE,
  MODIFY_USER_REQUEST,
  MODIFY_USER_SUCCESS,
  SIGNUP_FAILRE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../reducers/user";
import { func } from "prop-types";

/*===========회원정보========== */
function loadUserInfoAPI() {
  return axios.get("/user");
}
function* loadUserInfo() {
  try {
    // const result = yield call(loadUserInfoAPI);
    console.log("loadUserInfoAPI result");
    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_INFO_FAILURE,
      error: err.response.data,
    });
  }
}
/*===========회원가입========== */
function signupAPI(data) {
  //id , pw, nickname 전달
  return axios.post("/user", data);
}
function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data);
    console.log("signupAPI result", result);

    //result.data.status 가 403일경우 이미 사용중인 아이디.
    yield put({
      type: SIGNUP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNUP_FAILRE,
      error: err.response.data,
    });
  }
}

/*===========아이디중복체크========== */
function duplicateCheckIdAPI(data) {
  return axios.post("/user/duplicatechkid", data);
}
function* duplicateCheckId(action) {
  try {
    const result = yield call(duplicateCheckIdAPI, action.data);
    console.log("duplicateCheckIdAPI result", result);

    //기존 아이디 없을 때 N 있을 때 Y
    yield put({
      type: DUPLICATE_CHECK_ID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);

    yield put({
      type: DUPLICATE_CHECK_ID_FAILRE,
      error: err.response.data,
    });
  }
}

/* ==========로그인============ */
function loginAPI(data) {
  // data.email, data.password 전달.
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    // const result = yield call(loginAPI, action.data);
    // console.log('result loginAPI', result);
    // yield delay(1000);

    yield put({
      type: LOG_IN_SUCCESS,
      // data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILRE,
      error: err.response.data,
    });
  }
}
/* ==========로그아웃============ */
function logoutAPI() {
  // data.email, data.password 전달.
  return axios.post("/user/logout");
}

function* logOut() {
  try {
    // const result = yield call(logoutAPI);
    // console.log('result loginAPI', result);
    // yield delay(1000);

    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGOUT_FAILRE,
      error: err.response.data,
    });
  }
}

/* ==========회원정보 수정============ */
function modifyUserAPI(data) {
  // data.email, data.password 전달.
  return axios.post("/user/modify", data);
}

function* modifyUser(action) {
  try {
    // const result = yield call(modifyUserAPI, action.data);
    // console.log('result loginAPI', result);
    // yield delay(1000);

    /* 
    n-> 기존 비번 불일치 리턴
    */
    yield put({
      type: MODIFY_USER_SUCCESS,
      data: {
        beforePwChk: "N",
      },
      // data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MODIFY_USER_FAILRE,
      error: err.response.data,
    });
  }
}

function* watchLoadUserInfo() {
  yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}
function* watchDuplicateCheckId() {
  yield takeLatest(DUPLICATE_CHECK_ID_REQUEST, duplicateCheckId);
}
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOGOUT_REQUEST, logOut);
}
function* watchModifyUser() {
  yield takeLatest(MODIFY_USER_REQUEST, modifyUser);
}

export default function* userSaga() {
  yield all([fork(watchLoadUserInfo)]);
  yield all([fork(watchSignup)]);
  yield all([fork(watchDuplicateCheckId)]);
  yield all([fork(watchLogin)]);
  yield all([fork(watchLogOut)]);
  yield all([fork(watchModifyUser)]);
}
