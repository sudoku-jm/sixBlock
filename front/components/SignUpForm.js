import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import FormStyle from "../style/FormStyle";
import { PageTitle, ErrorMsg, DoneMsg } from "../style/AppCommonStyle";
import { DUPLICATE_CHECK_ID_REQUEST, SIGNUP_REQUEST } from "../reducers/user";
import Router from "next/router";
import regChk from "../hooks/useReg";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { signupDone, signupError, duplicateIdDone, duplicateIdError, user } =
    useSelector((state) => state.user);

  const idRef = useRef(null);
  const [userId, setUserId] = useState("");
  const [flagId, setFlagId] = useState(false);
  const [flagReId, setFlagReId] = useState(true);
  const [idDuple, setIdDuple] = useState(duplicateIdDone);
  const [userNickName, onChangeNickName, setUserNickName] = useInput("");
  const [userPassword, setPassword] = useState("");
  const [userPasswordChk, setUserPasswordChk] = useState("");
  const [term, setTerm] = useState(false);

  const [errorMsg, setErrorMsg] = useState({});
  const [signupActive, setSignupActive] = useState(true);

  useEffect(() => {
    if (user && user.userid) {
      Router.replace("/");
    }
  }, [user && user.userid]);
  useEffect(() => {
    if (signupDone) {
      console.log("성공!");
      setUserId("");
      setUserNickName("");
      setPassword("");
      setUserPasswordChk("");
      setTerm(false);
      setErrorMsg({});
      Router.push("/");
    }
  }, [signupDone]);

  useEffect(() => {
    if (duplicateIdDone) {
      setErrorMsg({
        ...errorMsg,
        id: {
          error: false,
          done: true,
          msg: "아이디 사용 가능",
        },
      });
      setIdDuple(true);
      setSignupActive(false);
    } else {
      setErrorMsg({
        ...errorMsg,
        id: {
          error: true,
          done: false,
          msg: "이미 존재하는 아이디입니다.",
        },
      });
    }
  }, [duplicateIdDone]);

  useEffect(() => {
    if (duplicateIdError) {
      alert(duplicateIdError);
    }
    if (signupError) {
      alert(signupError);
    }
  }, [signupError, duplicateIdError]);

  const validationChk = () => {
    //아이디 검증
    if (userId === "") {
      setErrorMsg({
        ...errorMsg,
        id: {
          ...errorMsg.id,
          error: true,
          msg: "필수 정보 입니다",
        },
      });
      return;
    }
    if (regChk.idRegExp(userId)) {
      setErrorMsg({
        ...errorMsg,
        id: {
          error: true,
          done: false,
          msg: "영문 숫자 포함 4-20자 이내",
        },
      });
      return;
    }
    //닉네임 검증
    if (regChk.nicknameRegExp(userNickName)) {
      setErrorMsg({
        ...errorMsg,
        nickname: {
          error: true,
          done: false,
          msg: "2-8자 이내 한글 혹은 영문",
        },
      });
      return;
    }
    //비밀번호 검증
    if (regChk.passwordRegExp(userPassword)) {
      setErrorMsg({
        ...errorMsg,
        password: {
          error: true,
          done: false,
          msg: "영문 숫자 특수문자 포함 8-20자 이내",
        },
      });
      return;
    }
    if (userPassword !== userPasswordChk) {
      setErrorMsg({
        ...errorMsg,
        passwordRe: {
          error: true,
          done: false,
          msg: "비밀번호가 일치하지 않습니다.",
        },
      });
      return;
    }
    //약관동의
    if (!term) {
      setErrorMsg({
        ...errorMsg,
        term: {
          error: true,
          done: false,
          msg: "약관동의 체크해야 가입가능.",
        },
      });
      return;
    }

    return true;
  };

  useEffect(() => {
    if (userId === "") {
      setErrorMsg({});
    }

    let clicked = false;

    const fuc = () => {
      if (userId === "") {
        setErrorMsg({
          ...errorMsg,
          id: {
            ...errorMsg.id,
            error: true,
            msg: "필수 정보 입니다",
          },
        });
        return;
      }
      if (regChk.idRegExp(userId)) {
        setErrorMsg({
          ...errorMsg,
          id: {
            ...errorMsg.id,
            error: true,
            msg: "영문 숫자 포함 4-20자 이내",
          },
        });
      }
      if (!idDuple) {
        dispatch({
          type: DUPLICATE_CHECK_ID_REQUEST,
          data: { userId },
        });
      }
    };

    const handleClickOutside = (event) => {
      if (
        idRef.current &&
        !idRef.current.contains(event.target) &&
        flagId &&
        flagReId
      ) {
        if (!clicked) {
          fuc();
        }
      }
    };

    const handleBlurOutside = (event) => {
      clicked = true;
      if (
        idRef.current &&
        idRef.current.contains(event.target) &&
        flagId &&
        flagReId
      ) {
        fuc();
      }
    };
    document.addEventListener("focusout", handleBlurOutside, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("focusout", handleBlurOutside, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [userId, flagId, idDuple]);

  //폼 전송
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setErrorMsg({});
      if (validationChk()) {
        //데이터 전달.
        dispatch({
          type: SIGNUP_REQUEST,
          data: {
            userId,
            userNickName,
            userPassword,
          },
        });
      }
    },
    [userId, userNickName, userPassword, userPasswordChk, term]
  );

  const onFocusId = useCallback(
    (e) => {
      e.preventDefault();
      setFlagId(true);
    },
    [flagId]
  );

  const onChangeId = useCallback((e) => {
    setUserId(e.target.value);
    if (e.target.value === "") {
      setErrorMsg({
        ...errorMsg,
        id: {
          ...errorMsg.id,
          error: true,
          msg: "필수 정보 입니다",
        },
      });
    } else if (regChk.idRegExp(e.target.value)) {
      setFlagReId(false);
      setErrorMsg({
        ...errorMsg,
        id: {
          ...errorMsg.id,
          error: true,
          msg: "영문 숫자 포함 4-20자 이내",
        },
      });
    } else {
      setErrorMsg({});
      setFlagReId(true);
      setIdDuple(false);
    }
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setErrorMsg({});
  }, []);
  const onChangePasswordChk = useCallback(
    (e) => {
      setUserPasswordChk(e.target.value);
      setErrorMsg({});
    },
    [userPassword]
  );
  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
      setErrorMsg({});
    },
    [term]
  );
  return (
    <FormStyle>
      <PageTitle>회원가입</PageTitle>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label className="essential">아이디</label>
          <input
            type="text"
            name="user-id"
            placeholder="영문 숫자 포함 4-20자 이내"
            value={userId}
            onChange={onChangeId}
            onFocus={onFocusId}
            ref={idRef}
            minLength="4"
            maxLength="20"
            required
          />
          {errorMsg.id?.error ? (
            <ErrorMsg>{errorMsg.id.msg}</ErrorMsg>
          ) : errorMsg.id?.done ? (
            <DoneMsg>아이디 사용가능</DoneMsg>
          ) : (
            ""
          )}
        </div>
        {/* <div className="form-input">
          <label>이메일</label>
          <div className="form-row form-email">
            <input type="text" placeholder="이메일" />
            <em>@</em>
            <div className="select-box">
              <select>
                <option>선택</option>
                <option>직접입력</option>
                <option>naver.com</option>
                <option>gmail.com</option>
                <option>daum.net</option>
              </select>
            </div>
            <input type="text" placeholder="직접입력" />
          </div>
        </div> */}
        <div className="form-input">
          <label className="essential">닉네임</label>
          <input
            type="text"
            name="user-nickname"
            value={userNickName}
            placeholder="2-8자 이내 한글 혹은 영문"
            minLength="2"
            maxLength="8"
            onChange={onChangeNickName}
            required
          />
          {errorMsg.nickname?.error && (
            <ErrorMsg>{errorMsg.nickname.msg}</ErrorMsg>
          )}
        </div>
        <div className="form-input">
          <label className="essential">비밀번호</label>
          <input
            type="password"
            placeholder="영문 숫자 특수문자 포함 8-20자 이내"
            name="user-password"
            value={userPassword}
            onChange={onChangePassword}
            minLength="8"
            maxLength="20"
            required
          />
          {errorMsg.password?.error && (
            <ErrorMsg>{errorMsg.password.msg}</ErrorMsg>
          )}
        </div>
        <div className="form-input">
          <label className="essential">비밀번호 재입력</label>
          <input
            type="password"
            name="user-password-chk"
            placeholder="비밀번호 재입력"
            value={userPasswordChk}
            onChange={onChangePasswordChk}
            minLength="8"
            maxLength="20"
            required
          />
          {errorMsg.passwordRe?.error && (
            <ErrorMsg>{errorMsg.passwordRe.msg}</ErrorMsg>
          )}
        </div>
        <div className="form-chk">
          <input
            type="checkbox"
            name="user-term"
            id="user-term"
            value={term}
            onChange={onChangeTerm}
            checked={term}
          />
          <label htmlFor="user-term">
            <span>약관동의</span>
          </label>
        </div>
        {errorMsg.term?.error && <ErrorMsg>{errorMsg.term.msg}</ErrorMsg>}

        <div className="form-btn form-btn-login">
          <button
            type="submit"
            className="btnL btnRound btn-primary"
            disabled={signupActive}
          >
            회원가입
          </button>
        </div>
      </form>
    </FormStyle>
  );
};

export default SignUpForm;
