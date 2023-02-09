import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_FAILRE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "../reducers/user";

/*===========회원가입========== */
function signupAPI(data) {
  return axios.post("/user/signup", data);
}
function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data);
    console.log("signupAPI result");
    yield put({
      type: SIGNUP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGNUP_FAILRE,
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
    const result = yield call(loginAPI, action.data);
    // console.log('result loginAPI', result);
    // yield delay(1000);

    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILRE,
      error: err.response.data,
    });
  }
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

export default function* userSaga() {
  yield all([fork(watchSignup)]);
  yield all([fork(watchLogin)]);
}
