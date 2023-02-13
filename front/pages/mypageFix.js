import React from "react";
import AppLayout from "../components/AppLayout";
import Menu from "../components/Menu";

import UserProfileFixForm from "../components/UserProfileFixForm";
import { UserProfileStyle } from "../style/UserStyle";
import PhotoProfile from "../components/PhotoProfile";
import { useSelector } from "react-redux";
const mypageFix = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = user;
  return (
    <AppLayout>
      <h1 className="hdtxt">내 정보 수정</h1>
      <Menu page="mypage" />
      <UserProfileStyle page="fix">
        <PhotoProfile page="fix" />
        <div className="profile-info">
          <p className="user-id">{id}</p>
        </div>
      </UserProfileStyle>
      <UserProfileFixForm />
    </AppLayout>
  );
};

export default mypageFix;
