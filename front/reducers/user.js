const initalState = {
  isLoggedIn: false,
  user: {
    id: "jm",
    nickname: "정미니",
    password: null,
    // email : 'jm91@bodyfriend.co.kr',
  },
  signupLoading: false, //회원가입
  signupDone: false,
  signupError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
};

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILRE = "SIGNUP_FAILRE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILRE = "LOG_IN_FAILRE";

const reducer = (state = initalState, action) => {
  switch (action.type) {
    //================회원가입
    case SIGNUP_REQUEST:
      draft.signupLoading = true;
      draft.signupDone = false;
      draft.signupError = null;
      break;
    case SIGNUP_SUCCESS:
      draft.signupLoading = false;
      draft.signupDone = true;
      draft.signupError = null;
      break;
    case SIGNUP_FAILRE:
      draft.signupLoading = false;
      draft.signupDone = false;
      draft.signupError = true;
      break;
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
