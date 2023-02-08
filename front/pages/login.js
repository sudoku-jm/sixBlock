import React from "react";

import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";

const login = () => {
  return (
    <AppLayout>
      <h1 className="hdtxt">로그인 페이지</h1>
      <LoginForm />
    </AppLayout>
  );
};

export default login;
