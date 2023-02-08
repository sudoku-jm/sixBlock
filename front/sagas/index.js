import axios from "axios";
import { all, fork } from "redux-saga/effects";
// import blockSaga from './block';
import userSaga from "./user";
import { backUrl } from "../config/config";

export default function* rootSaga() {
  axios.defaults.baseURL = backUrl;
  axios.defaults.withCredentials = true;
  yield all([
    fork(userSaga),
    // fork(blockSaga),
  ]);
}
