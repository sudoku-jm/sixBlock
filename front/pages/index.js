import React from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import DayBlock from "../components/DayBlock";
import LoginForm from "../components/LoginForm";
import Menu from "../components/Menu";

const Home = () => {
  const { logInDone } = useSelector((state) => state.user);
  return (
    <AppLayout>
      {logInDone ? (
        <>
          <Menu page="index" />
          <DayBlock />
        </>
      ) : (
        <LoginForm />
      )}
    </AppLayout>
  );
};

export default Home;
