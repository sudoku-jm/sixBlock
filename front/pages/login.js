import React from "react";

import AppLayout from "../components/AppLayout";
import LoginLayout from "../components/LoginLayout";

const login = () => {
  return (
    <AppLayout>
      <h1>로그인 페이지</h1>
      <LoginLayout />
    </AppLayout>
  );
};

export default login;
