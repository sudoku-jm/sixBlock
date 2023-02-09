import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import FormStyle from "../style/FormStyle";
import { PageTitle, ErrorMsg } from "../style/AppCommonStyle";
import { SIGNUP_REQUEST } from "../reducers/user";
import Router from "next/router";
const SignUpForm = () => {
  const dispatch = useDispatch();
  const { signupDone, signupError } = useSelector((state) => state.user);
  const [userId, onChangeId, setUserId] = useInput("");
  const [userNickName, onChangeNickName, setUserNickName] = useInput("");
  const [userPassword, setPassword] = useState("");
  const [userPasswordChk, setUserPasswordChk] = useState("");
  const [term, setTerm] = useState(false);

  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  useEffect(() => {
    if (signupDone) {
      console.log("성공!");
      setUserId("");
      setUserNickName("");
      setPassword("");
      setUserPasswordChk("");
      setTerm(false);
      setPasswordValidationError(false);
      setPasswordError(false);
      setTermError(false);
      Router.push("/");
    }
  }, [signupDone]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);
  const validationChk = () => {
    const idRegExp = /^[a-z]+[a-z0-9]{3,19}$/g;
    const passwordRegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,19}$/;
    const nicknameRegExp = /^[가-힣|a-z|A-Z|]+$/;
    //아이디 검증
    if (!idRegExp.test(userId)) {
      alert("아이디 확인!");
      return;
    }
    //닉네임 검증
    if (!nicknameRegExp.test(userNickName)) {
      alert("닉네임 확인!");
      return;
    }
    //비밀번호 검증
    if (!passwordRegExp.test(userPassword)) {
      alert("비밀번호 확인!");
      return setPasswordValidationError(true);
    }
    if (userPassword !== userPasswordChk) {
      alert("비밀번호 재입력 확인!");
      return setPasswordError(true);
    }
    //약관동의
    if (!term) {
      alert("약관동의 확인!");
      return setTermError(true);
    }

    return true;
  };
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
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

  const onDuplicateChk = useCallback((e) => {
    e.preventDefault();
    console.log("asdasdsad");
  }, []);
  const onChangePassword = useCallback((e) => {
    setPasswordValidationError(false);
    setPassword(e.target.value);
    console.log(e.target.value);
  }, []);
  const onChangePasswordChk = useCallback(
    (e) => {
      setPasswordError(e.target.value !== userPassword);
      setUserPasswordChk(e.target.value);
    },
    [userPassword]
  );
  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
      setTermError(false);
    },
    [term]
  );
  return (
    <FormStyle>
      <PageTitle>회원가입</PageTitle>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label className="essential">아이디</label>
          <div className="form-row form-id">
            <input
              type="text"
              name="user-id"
              placeholder="영문 숫자 포함 4-20자 이내"
              value={userId}
              onChange={onChangeId}
              minLength="4"
              maxLength="20"
              required
            />
            <button
              className="btnS btnRoundS btn-primary"
              onClick={onDuplicateChk}
            >
              중복검사
            </button>
          </div>
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
          {passwordValidationError && (
            <ErrorMsg>
              영문 숫자 특수문자 포함 8-20자 이내로 입력하세요.
            </ErrorMsg>
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
          {passwordError && <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}
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
        {termError && <ErrorMsg>약관동의 체크해야 가입가능요^^</ErrorMsg>}

        <div className="form-btn form-btn-login">
          <button type="submit" className="btnL btnRound btn-primary">
            회원가입
          </button>
        </div>
      </form>
    </FormStyle>
  );
};

export default SignUpForm;
