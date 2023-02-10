import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useInput from "../hooks/useInput";
import FormStyle from "../style/FormStyle";
import { PageTitle } from "../style/AppCommonStyle";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";
const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInError } = useSelector((state) => state.user);
  const [userId, onChangeId] = useInput("");
  const [userPassword, onChangeUserPassword] = useInput("");
  const [autoLogin, setAutoLogin] = useState(false);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          userId,
          userPassword,
        },
      });
    },
    [userId, userPassword]
  );

  const onAutoLoginChk = useCallback(
    (e) => {
      setAutoLogin(e.target.checked);
    },
    [autoLogin]
  );

  return (
    <FormStyle>
      <PageTitle>로그인</PageTitle>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label>아이디</label>
          <input
            type="text"
            name="user-id"
            value={userId}
            placeholder="아이디"
            onChange={onChangeId}
            required
          />
        </div>
        <div className="form-input">
          <label>비밀번호</label>
          <input
            type="password"
            name="user-password"
            value={userPassword}
            placeholder="비밀번호"
            onChange={onChangeUserPassword}
            required
          />
        </div>
        <div className="form-chk">
          <input
            type="checkbox"
            name="auto-login"
            value={autoLogin}
            id="login-auto"
            checked={autoLogin}
            onChange={onAutoLoginChk}
          />
          <label htmlFor="login-auto">
            <span>자동로그인</span>
          </label>
        </div>
        <div className="form-btn form-btn-login">
          <button type="submit" className="btnL btnRound btn-primary">
            로그인
          </button>
        </div>
      </form>

      <div className="form-btn">
        <Link href="/signup">
          <a title="페이지이동" className="btnL btnRound btn-unvisiblelity-bdr">
            회원가입
          </a>
        </Link>
      </div>

      <div className="form-btn form-btn-account col2">
        <Link href="/findAccount">
          <a title="페이지이동" className="btnS">
            아이디 찾기
          </a>
        </Link>
        <Link href="/findAccount">
          <a title="페이지이동" className="btnS">
            비밀번호 찾기
          </a>
        </Link>
      </div>
    </FormStyle>
  );
};

export default LoginForm;
