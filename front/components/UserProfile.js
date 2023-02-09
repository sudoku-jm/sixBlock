import React from "react";
import { UserProfileStyle } from "../style/UserStyle";
import PhotoProfile from "./PhotoProfile";
import ProfileInfo from "./ProfileInfo";

const UserProfile = () => {
  return (
    <UserProfileStyle>
      <PhotoProfile />
      <ProfileInfo />
    </UserProfileStyle>
  );
};

export default UserProfile;
