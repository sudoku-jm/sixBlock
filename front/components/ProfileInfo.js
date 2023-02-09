import React from "react";

const ProfileInfo = () => {
  return (
    <div className="profile-info">
      <i className="nickname">닉네임</i>
      <em className="email">jm91@bodyfriend.co.kr</em>
      <div className="btn-area">
        <button className="btnS btnRound btn-grey">내 정보 수정</button>
        <button className="btnS btnRound btn-grey">로그아웃</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
