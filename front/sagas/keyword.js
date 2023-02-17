import { all, fork, put, takeLatest } from "redux-saga/effects";
import { KEYWORD_INPUT } from "../reducers/keyword";

function* inputKeyword(action){
  try{
    yield put(
      {
        type: KEYWORD_INPUT,
        keyword: action.keyword
      }
    )
  }catch(error){
    console.log("ERROR", error)
  }
}

function* watchKeyword(){
  yield takeLatest(KEYWORD_INPUT, inputKeyword)
}

export default function* keywordSaga(){
  yield all([fork(watchKeyword),])
}