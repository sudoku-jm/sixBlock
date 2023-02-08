import React from "react";

import AppLayout from "../components/AppLayout";
import SignUpForm from "../components/SignUpForm";

const signup = () => {
  return (
    <AppLayout>
      <h1 className="hdtxt">로그인 페이지</h1>
      <SignUpForm />
    </AppLayout>
  );
};

export default signup;
