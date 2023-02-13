import { useCallback, useEffect, useState } from "react";
import FormStyle from "../style/FormStyle";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMsg } from "../style/AppCommonStyle";
import regChk from "../hooks/useReg";
import { MODIFY_USER_REQUEST } from "../reducers/user";
const UserProfileFixForm = () => {
  const dispatch = useDispatch();
  const { user, modifyUserDone, modifyUserError, beforePwChk } = useSelector(
    (state) => state.user
  );
  const { nickname } = user;
  const [userInput, setUserInput] = useState({
    userNickname: nickname,
    passwordBefore: "",
    passwordNew: "",
    passwordNewChk: "",
  });
  const { userNickname, passwordBefore, passwordNew, passwordNewChk } =
    userInput;
  const [doneFlag, setDoneFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  useEffect(() => {
    if (modifyUserDone && beforePwChk === null) {
      console.log("수정 성공!");
      setErrorMsg({});
      setUserInput({
        ...userInput,
      });
    } else if (doneFlag && beforePwChk !== null) {
      setErrorMsg({
        ...errorMsg,
        passwordBefore: {
          error: true,
          done: false,
          msg: "기존 비밀번호가 틀렸습니다.",
        },
      });
      setDoneFlag(false);
    }
  }, [modifyUserDone, beforePwChk, doneFlag]);
  useEffect(() => {
    if (modifyUserError) {
      alert(modifyUserError);
    }
    return () => {
      setErrorMsg({});
    };
  }, [modifyUserError]);

  const validationChk = () => {
    //닉네임 검증
    if (regChk.nicknameRegExp(userNickname)) {
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
    if (regChk.passwordRegExp(passwordBefore)) {
      setErrorMsg({
        ...errorMsg,
        passwordBefore: {
          error: true,
          done: false,
          msg: "영문 숫자 특수문자 포함 8-20자 이내",
        },
      });
      return;
    }
    if (regChk.passwordRegExp(passwordNew)) {
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

    if (passwordNew !== passwordNewChk) {
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

    return true;
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setErrorMsg({});
      if (validationChk()) {
        //데이터 전달.
        console.log(userNickname, passwordBefore, passwordNew, passwordNewChk);
        dispatch({
          type: MODIFY_USER_REQUEST,
          data: userInput,
        });
        console.log("gg");
        setDoneFlag(true);
      }
    },
    [userNickname, passwordBefore, passwordNew, passwordNewChk]
  );

  const onInputChange = useCallback(
    (e) => {
      setUserInput({
        ...userInput,
        [e.target.name]: e.target.value,
      });
      setErrorMsg({});
    },
    [userNickname, passwordBefore, passwordNew, passwordNewChk]
  );
  return (
    <>
      <FormStyle>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label>닉네임</label>
            <input
              type="text"
              name="userNickname"
              value={userNickname}
              minLength="2"
              maxLength="8"
              onChange={onInputChange}
            />
            {errorMsg.nickname?.error && (
              <ErrorMsg>{errorMsg.nickname.msg}</ErrorMsg>
            )}
          </div>
          <div className="form-input">
            <label>기존 비밀번호</label>
            <input
              type="password"
              name="passwordBefore"
              value={passwordBefore}
              minLength="8"
              maxLength="20"
              placeholder="기존 비밀번호"
              onChange={onInputChange}
            />
            {errorMsg.passwordBefore?.error && (
              <ErrorMsg>{errorMsg.passwordBefore.msg}</ErrorMsg>
            )}
          </div>
          <div className="form-input">
            <label>신규 비밀번호</label>
            <input
              type="password"
              name="passwordNew"
              value={passwordNew}
              minLength="8"
              maxLength="20"
              placeholder="신규 비밀번호"
              onChange={onInputChange}
            />
            {errorMsg.password?.error && (
              <ErrorMsg>{errorMsg.password.msg}</ErrorMsg>
            )}
          </div>
          <div className="form-input">
            <label>신규 비밀번호 확인</label>
            <input
              type="password"
              name="passwordNewChk"
              value={passwordNewChk}
              minLength="8"
              maxLength="20"
              placeholder="신규 비밀번호 확인"
              onChange={onInputChange}
            />
            {errorMsg.passwordRe?.error && (
              <ErrorMsg>{errorMsg.passwordRe.msg}</ErrorMsg>
            )}
          </div>
          <div className="form-btn form-btn-login">
            <button type="submit" className="btnL btnRound btn-primary">
              수정
            </button>
          </div>
        </form>
      </FormStyle>
    </>
  );
};

export default UserProfileFixForm;
