import React from "react";
import AppLayout from "../components/AppLayout";
import UserPlanerStatus from "../components/UserPlanerStatus";
import UserProfile from "../components/UserProfile";
import Menu from "../components/Menu";
const mypage = () => {
  return (
    <AppLayout>
      <h1 className="hdtxt">마이 페이지</h1>
      <Menu page="mypage" />

      <UserProfile />
      <UserPlanerStatus />
    </AppLayout>
  );
};

export default mypage;
