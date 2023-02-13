const regChk = {
  idRegExp: (str) => {
    //아이디 검증
    const reg = /^[a-z]+[a-z0-9]{3,19}$/g;
    if (!reg.test(str)) {
      return true;
    }
    return false;
  },
  passwordRegExp: (str) => {
    //비밀번호 검증
    const reg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,19}$/;
    if (!reg.test(str)) {
      return true;
    }
    return false;
  },
  nicknameRegExp: (str) => {
    //닉네임 검증
    const reg = /^[가-힣|a-z|A-Z]+$/;
    if (!reg.test(str)) {
      return true;
    }
    return false;
  },
};

export default regChk;
