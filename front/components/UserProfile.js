import React from "react";
import { UserProfileStyle } from "../style/UserStyle";
import PhotoProfile from "./PhotoProfile";
import ProfileInfo from "./ProfileInfo";

const UserProfile = () => {
  return (
    <UserProfileStyle page="mypage">
      <PhotoProfile page="mypage" />
      <ProfileInfo />
    </UserProfileStyle>
  );
};

export default UserProfile;
