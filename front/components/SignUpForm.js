import Link from "next/link";
import FormStyle from "../style/FormStyle";
import { PageTitle } from "../style/AppCommonStyle";
const SignUpForm = () => {
  return (
    <FormStyle>
      <PageTitle>회원가입</PageTitle>
      <form>
        <div className="form-input">
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
            {/* <input type="text" placeholder="직접입력" /> */}
          </div>
        </div>
        <div className="form-input">
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호" />
        </div>
        <div className="form-input">
          <label>비밀번호 재입력</label>
          <input type="password" placeholder="비밀번호 재입력" />
        </div>
        <div className="form-chk">
          <input type="checkbox" name="" id="login-auto" />
          <label htmlFor="login-auto">
            <span>약관 동의</span>
          </label>
        </div>

        <div className="form-btn form-btn-login">
          <button className="btnL btnRound btn-primary">회원가입</button>
        </div>
      </form>
    </FormStyle>
  );
};

export default SignUpForm;
