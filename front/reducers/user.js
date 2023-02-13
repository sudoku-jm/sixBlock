import produce from "immer";

const initialState = {
  user: {},
  loadUserInfoLoading: false, //유저 정보 가져오기
  loadUserInfoDone: false,
  loadUserInfoError: null,
  signupLoading: false, //회원가입
  signupDone: false,
  signupError: null,
  duplicateIdLoading: false, //아이디 중복체크
  duplicateIdDone: false,
  duplicateIdError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
};

//회원정보
export const LOAD_USER_INFO_SUCCESS = "LOAD_USER_INFO_SUCCESS";
export const LOAD_USER_INFO_REQUEST = "LOAD_USER_INFO_REQUEST";
export const LOAD_USER_INFO_FAILURE = "LOAD_USER_INFO_FAILURE";

//회원가입
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILRE = "SIGNUP_FAILRE";
export const DUPLICATE_CHECK_ID_REQUEST = "DUPLICATE_CHECK_ID_REQUEST";
export const DUPLICATE_CHECK_ID_SUCCESS = "DUPLICATE_CHECK_ID_SUCCESS";
export const DUPLICATE_CHECK_ID_FAILRE = "DUPLICATE_CHECK_ID_FAILRE";
//로그인
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILRE = "LOG_IN_FAILRE";

const dummuUser = (data) => ({
  id: "jm1234",
  nickname: "정미니",
  password: null,
  email: "jm91@bodyfriend.co.kr",
  photoProfile:
    "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  plans: {
    totalPlans: 300,
    successRate: 100,
    topKeywords: ["운동", "회사", "독서", "학원", "친구약속"],
  },
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      //================회원정보
      case LOAD_USER_INFO_REQUEST:
        draft.loadUserInfoLoading = true;
        draft.loadUserInfoDone = false;
        draft.loadUserInfoError = null;
        break;
      case LOAD_USER_INFO_SUCCESS:
        draft.loadUserInfoLoading = false;
        draft.loadUserInfoDone = true;
        // draft.user = action.data;
        draft.user = dummuUser();
        break;
      case LOAD_USER_INFO_FAILURE:
        draft.loadUserInfoLoading = false;
        draft.loadUserInfoDone = false;
        draft.loadUserInfoError = action.error;
        break;
      //================회원가입
      case SIGNUP_REQUEST:
        draft.signupLoading = true;
        draft.signupDone = false;
        draft.signupError = null;
        break;
      case SIGNUP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        break;
      case SIGNUP_FAILRE:
        draft.signupLoading = false;
        draft.signupDone = false;
        draft.signupError = action.error;
        break;
      //= ==============아이디 중복체크
      case DUPLICATE_CHECK_ID_REQUEST:
        draft.duplicateIdLoading = true;
        draft.duplicateIdDone = false;
        draft.duplicateIdError = null;
        break;
      case DUPLICATE_CHECK_ID_SUCCESS:
        draft.duplicateIdLoading = false;
        draft.duplicateIdDone = true;
        break;
      case DUPLICATE_CHECK_ID_FAILRE:
        draft.duplicateIdLoading = false;
        draft.duplicateIdDone = false;
        draft.duplicateIdError = action.error;
        break;
      //= ==============로그인
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        // draft.user = action.data;
        // draft.user = dummuUser();
        break;
      case LOG_IN_FAILRE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
