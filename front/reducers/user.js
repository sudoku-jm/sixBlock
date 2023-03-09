// import produce from "immer";
import produce from '../util/produce';

const initialState = {
  user: null,
  loadUserInfoLoading: false, //유저 프로필 정보 가져오기
  loadUserInfoDone: false,
  loadUserInfoError: null,
  loadProfileInfoLoading: false, //유저 프로필 정보 가져오기
  loadProfileInfoDone: false,
  loadProfileInfoError: null,
  signupLoading: false, //회원가입
  signupDone: false,
  signupError: null,
  duplicateIdLoading: false, //아이디 중복체크
  duplicateIdDone: null,
  duplicateIdError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  modifyUserLoading: false, //유저 정보 수정
  modifyUserDone: false,
  modifyUserError: null,
  beforePwChk: null,
  profileImgUploadLoading : false, //유저 프로필 사진 등록 시도
  profileImgUploadDone : false,
  profileImgUploadError : null,

};

//회원 기본정보
export const LOAD_USER_INFO_REQUEST = "LOAD_USER_INFO_REQUEST";
export const LOAD_USER_INFO_SUCCESS = "LOAD_USER_INFO_SUCCESS";
export const LOAD_USER_INFO_FAILURE = "LOAD_USER_INFO_FAILURE";

//회원정보 프로필,마이페이지
export const LOAD_PROFILE_INFO_SUCCESS = "LOAD_PROFILE_INFO_SUCCESS";
export const LOAD_PROFILE_INFO_REQUEST = "LOAD_PROFILE_INFO_REQUEST";
export const LOAD_PROFILE_INFO_FAILURE = "LOAD_PROFILE_INFO_FAILURE";

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

//로그아웃
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILRE = "LOGOUT_FAILRE";

//회원정보 수정
export const MODIFY_USER_REQUEST = "MODIFY_USER_REQUEST";
export const MODIFY_USER_SUCCESS = "MODIFY_USER_SUCCESS";
export const MODIFY_USER_FAILRE = "MODIFY_USER_FAILRE";

//프로필 사진 변경
export const UPLOAD_PROFILE_IMG_REQUEST = "UPLOAD_PROFILE_IMG_REQUEST";
export const UPLOAD_PROFILE_IMG_SUCCESS = "UPLOAD_PROFILE_IMG_SUCCESS";
export const UPLOAD_PROFILE_IMG_FAILRE = "UPLOAD_PROFILE_IMG_FAILRE";

const dummuUser = (data) => ({
  // id: "jm1234",
  // nickname: "정미니",
  // password: null,
  // email: "jm91@bodyfriend.co.kr",
  // photoProfile:
  //   "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  // plans: {
  //   totalPlans: 300,
  //   successRate: 100,
  //   topKeywords: ["운동", "회사", "독서", "학원", "친구약속"],
  // },
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      //================회원정보
      case LOAD_USER_INFO_REQUEST:
        draft.loadUserInfoLoading = true;
        draft.loadUserInfoDone = false;
        draft.loadUserInfoError = null;
        draft.modifyUserDone = false;
        break;
      case LOAD_USER_INFO_SUCCESS:
        draft.loadUserInfoLoading = false;
        draft.loadUserInfoDone = true;
        draft.user = action.data;
        break;
      case LOAD_USER_INFO_FAILURE:
        draft.loadUserInfoLoading = false;
        draft.loadUserInfoDone = false;
        draft.loadUserInfoError = action.error;
        break;
      //================회원프로필정보
      case LOAD_PROFILE_INFO_REQUEST:
        draft.loadProfileInfoLoading = true;
        draft.loadProfileInfoDone = false;
        draft.loadProfileInfoError = null;
        draft.modifyUserDone = false;
        break;
      case LOAD_PROFILE_INFO_SUCCESS:
        draft.loadProfileInfoLoading = false;
        draft.loadProfileInfoDone = true;
        draft.user = action.data;
        draft.user.srcYn = action.data.srcYn;
        break;
      case LOAD_PROFILE_INFO_FAILURE:
        draft.loadProfileInfoLoading = false;
        draft.loadProfileInfoDone = false;
        draft.loadProfileInfoError = action.error;
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
        // draft.signupDone = false;
        draft.signupError = action.error;
        break;
      //= ==============아이디 중복체크
      case DUPLICATE_CHECK_ID_REQUEST:
        draft.duplicateIdLoading = true;
        draft.duplicateIdDone = null;
        draft.duplicateIdError = null;
        break;
      case DUPLICATE_CHECK_ID_SUCCESS:
        draft.duplicateIdLoading = false;
        draft.duplicateIdDone = action.data.duplicate == "N" ? true : false;
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
        draft.user = action.data;
        // draft.user = dummuUser();
        break;
      case LOG_IN_FAILRE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      //= ==============로그아웃
      case LOGOUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOGOUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.user = null;
        break;
      case LOGOUT_FAILRE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      //= ==============회원정보 수정
      case MODIFY_USER_REQUEST:
        draft.modifyUserLoading = true;
        draft.modifyUserDone = false;
        draft.modifyUserError = null;
        draft.beforePwChk = null;
        break;
      case MODIFY_USER_SUCCESS:
        draft.modifyUserLoading = false;
        draft.modifyUserDone = true;
        draft.beforePwChk = action.data.beforePwChk;
        draft.user.nickname =
          action.data.beforePwChk == "Y"
            ? action.data.nickname
            : draft.user.nickname;
        break;
      case MODIFY_USER_FAILRE:
        draft.modifyUserLoading = false;
        draft.modifyUserError = action.error;
        draft.beforePwChk = null;
        break;
      //= ==============회원 프로필 사진 등록
      case UPLOAD_PROFILE_IMG_REQUEST:
        draft.profileImgUploadLoading = true;
        draft.profileImgUploadDone = false;
        draft.profileImgUploadError = null;
        break;
      case UPLOAD_PROFILE_IMG_SUCCESS:
        draft.profileImgUploadLoading = false;
        draft.profileImgUploadDone = true;
        draft.user.photoProfile = action.data.file;
        break;
      case UPLOAD_PROFILE_IMG_FAILRE:
        draft.profileImgUploadLoading = false;
        draft.profileImgUploadError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
