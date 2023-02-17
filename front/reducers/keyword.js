import { dummyKeywordList } from "../dummy/dummyData";
import produce from "immer";

const initialState = {
  keywordList: dummyKeywordList,
};

export const KEYWORD_INPUT = "KEYWORD_INPUT";

export const inputKeyword = (keyword) => {
  console.log("INPUT KEYWORD ACTION");
  return {
    type: KEYWORD_INPUT,
    keyword,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case KEYWORD_INPUT:
        draft.keywordList.push(action.keyword);
        break;

      default:
        return state;
    }
  });
};
export default reducer