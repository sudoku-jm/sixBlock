import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../reducers/user";

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userid, nickname } = user;
  useEffect(() => {
    if (!(user && user.userid) && user == null) {
      Router.push("/");
    }
  }, [user && user.userid]);
  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, []);
  return (
    <div className="profile-info">
      <i className="nickname">{nickname}</i>
      <em className="user-id">{userid}</em>
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
