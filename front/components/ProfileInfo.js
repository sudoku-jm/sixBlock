import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const ProfileInfo = () => {
  const { user } = useSelector((state) => state.user);
  const { id, nickname } = user;
  return (
    <div className="profile-info">
      <i className="nickname">{nickname}</i>
      <em className="user-id">{id}</em>
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
