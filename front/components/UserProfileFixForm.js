import { useCallback, useState } from "react";
import FormStyle from "../style/FormStyle";
import { useSelector } from "react-redux";
const UserProfileFixForm = () => {
  const { user } = useSelector((state) => state.user);
  const { nickname } = user;
  const [userId, setUserId] = useState(nickname);
  const onNicknameChk = useCallback(
    (e) => {
      e.preventDefault();
      setUserId(e.target.value);
    },
    [userId]
  );
  return (
    <>
      <FormStyle>
        <div className="form-input">
          <label>닉네임</label>
          <input type="text" value={userId} onChange={onNicknameChk} />
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
          <button type="submit" className="btnL btnRound btn-primary">
            수정
          </button>
        </div>
      </FormStyle>
    </>
  );
};

export default UserProfileFixForm;
