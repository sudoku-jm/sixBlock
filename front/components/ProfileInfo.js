import Link from "next/link";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../reducers/user";

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { id, nickname } = user;
  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, []);
  return (
    <div className="profile-info">
      <i className="nickname">{nickname}</i>
      <em className="user-id">{id}</em>
      <div className="btn-area">
        <Link href="/mypageFix">
          <button className="btnS btnRound btn-grey">내 정보 수정</button>
        </Link>
        <button className="btnS btnRound btn-grey" onClick={onLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
