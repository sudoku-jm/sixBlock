import React from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import DayBlock from "../components/DayBlock";
import LoginLayout from "../components/LoginLayout";
import Menu from "../components/Menu";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <AppLayout>
      {isLoggedIn ? (
        <>
          <Menu />
          <DayBlock />
        </>
      ) : (
        <LoginLayout />
      )}
    </AppLayout>
  );
};

export default Home;
