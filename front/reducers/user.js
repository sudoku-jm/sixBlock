const initalState = {
  isLoggedIn: false,
  user: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  signUpdate: {},
  loginData: {},
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILRE = "LOG_IN_FAILRE";

const reducer = (state = initalState, action) => {
  switch (action.type) {
    //= ==============로그인
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInError = null;
      draft.logInDone = false;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.logInDone = true;
      draft.me = action.data;
      break;
    case LOG_IN_FAILRE:
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;
    default:
      return state;
  }
};

export default reducer;
