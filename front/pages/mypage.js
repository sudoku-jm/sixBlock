import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import UserPlanerStatus from "../components/UserPlanerStatus";
import PhotoProfile from "../components/PhotoProfile";
import ProfileInfo from "../components/ProfileInfo";
import Menu from "../components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_INFO_REQUEST } from "../reducers/user";
import { UserProfileStyle } from "../style/UserStyle";
const mypage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //임시(클라이언트 사이드 랜더링)
  useEffect(() => {
    //접속 시 유저정보 들고오기
    dispatch({
      type: LOAD_USER_INFO_REQUEST,
    });
  }, []);
  return (
    <AppLayout>
      <h1 className="hdtxt">마이 페이지</h1>
      <Menu page="mypage" />

      <UserProfileStyle page="mypage">
        <PhotoProfile page="mypage" />
        <ProfileInfo />
      </UserProfileStyle>
      <UserPlanerStatus plans={user.plans} />
    </AppLayout>
  );
};

export default mypage;
