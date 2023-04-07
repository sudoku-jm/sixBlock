import React, {  useEffect, } from "react";
import { useSelector } from "react-redux";
import { END } from 'redux-saga';
import Menu from "../components/Menu";
import Router from "next/router";
import wrapper from "../store/configureStore";
import axios from "axios";
import { LOAD_USER_INFO_REQUEST } from "../reducers/user";
import { LOAD_BLOCK_INFO_REQUEST } from "../reducers/block";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import Blocks from "../components/Blocks";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(user && user.userid)) {
      Router.push("/");
    }

  }, [user && user.userid]);

  return (
    <AppLayout>
      {user ? (
        <>
          <Menu page="index" />
          <Blocks/>
        </>
      ) : (
        <LoginForm />
      )}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';

  console.log("================cookie====================")
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_USER_INFO_REQUEST,
  });


  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
