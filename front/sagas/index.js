// import axios from "./axiosInstance";
import { all, fork } from "redux-saga/effects";
import userSaga from "./user";
import blockSaga from "./block";
// import { backUrl } from "../config/config";




export default function* rootSaga() {
  // console.log('backUrl>>',backUrl)
  // axios.defaults.baseURL = backUrl;
  // axios.defaults.withCredentials = true;
  yield all([fork(userSaga), fork(blockSaga)]);
}
