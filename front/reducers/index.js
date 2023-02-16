import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import block from "./block";
import keyword from "./keyword";
// import post from './post';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default:
      const combineReducer = combineReducers({
        user,
        block,
        keyword,
        // post,
      });
      return combineReducer(state, action);
  }
};

export default rootReducer;
