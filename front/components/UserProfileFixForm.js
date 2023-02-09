import React from "react";
import FormStyle from "../style/FormStyle";
const UserProfileFixForm = () => {
  return (
    <>
      <FormStyle>
        <div className="form-input">
          <label>닉네임</label>
          <input type="text" value="jm" placeholder="닉네임" />
        </div>
        <div className="form-input">
          <label>기존 비밀번호</label>
          <input type="password" placeholder="기존 비밀번호" />
        </div>
        <div className="form-input">
          <label>신규 비밀번호</label>
          <input type="password" placeholder="신규 비밀번호" />
        </div>
        <div className="form-input">
          <label>신규 비밀번호 확인</label>
          <input type="password" placeholder="신규 비밀번호 확인" />
        </div>
        <div className="form-btn form-btn-login">
          <button className="btnL btnRound btn-primary">수정</button>
        </div>
      </FormStyle>
    </>
  );
};

export default UserProfileFixForm;
