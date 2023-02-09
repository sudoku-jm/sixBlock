import axios from "axios";
import { all, fork } from "redux-saga/effects";
// import blockSaga from './block';
import userSaga from "./user";
import blockSaga from "./block";
import { backUrl } from "../config/config";

export default function* rootSaga() {
  axios.defaults.baseURL = backUrl;
  axios.defaults.withCredentials = true;
  yield all([
    fork(blockSaga),
    // fork(blockSaga),
  ]);
}
