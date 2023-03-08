import React from "react";
import { END } from 'redux-saga';
import wrapper from "../store/configureStore";
import { LOAD_USER_INFO_REQUEST } from "../reducers/user";
import axios from "axios";

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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';

  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store. dispatch({
    type: LOAD_USER_INFO_REQUEST,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default login;
