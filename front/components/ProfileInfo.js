import Link from "next/link";
import React from "react";

const ProfileInfo = () => {
  return (
    <div className="profile-info">
      <i className="nickname">닉네임</i>
      <em className="user-id">jm</em>
      <div className="btn-area">
        <Link href="/mypageFix">
          <button className="btnS btnRound btn-grey">내 정보 수정</button>
        </Link>
        <button className="btnS btnRound btn-grey">로그아웃</button>
      </div>
    </div>
  );
};

export default ProfileInfo;
