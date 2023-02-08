import Link from "next/link";
import FormStyle from "../style/FormStyle";
import { PageTitle } from "../style/AppCommonStyle";
const LoginForm = () => {
  return (
    <FormStyle>
      <PageTitle>로그인</PageTitle>
      <form>
        <div className="form-input">
          <label>아이디</label>
          <input type="text" placeholder="이메일 주소" />
        </div>
        <div className="form-input">
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호" />
        </div>
        <div className="form-chk">
          <input type="checkbox" name="" id="login-auto" />
          <label htmlFor="login-auto">
            <span>자동로그인</span>
          </label>
        </div>
        <div className="form-btn form-btn-login">
          <button className="btnL btnRound btn-primary">로그인</button>
        </div>
        <div className="form-btn">
          <Link href="/signup">
            <a
              title="페이지이동"
              className="btnL btnRound btn-unvisiblelity-bdr"
            >
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
      </form>
    </FormStyle>
  );
};

export default LoginForm;
