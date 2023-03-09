import React, { useEffect } from "react";
import { END } from 'redux-saga';
import Router from "next/router";
import AppLayout from "../components/AppLayout";
import UserPlanerStatus from "../components/UserPlanerStatus";
import PhotoProfile from "../components/PhotoProfile";
import ProfileInfo from "../components/ProfileInfo";
import Menu from "../components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_PROFILE_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from "../reducers/user";
import { UserProfileStyle } from "../style/UserStyle";
import wrapper from "../store/configureStore";
import axios from "axios";
const mypage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //임시(클라이언트 사이드 랜더링)
  useEffect(() => {
    if (!(user && user.userid) && user == null) {
      Router.push("/");
    }
    // if (user && user.userid) {
    //   dispatch({
    //     type: LOAD_PROFILE_INFO_REQUEST,
    //     data: { userid: user.userid },
    //   });
    // }
  }, [user && user.userid]);

  return (
    <AppLayout>
      <h1 className="hdtxt">마이 페이지</h1>
      <Menu page="mypage" />
      {user && (
        <>
          <UserProfileStyle page="mypage">
            <PhotoProfile page="mypage" />
            <ProfileInfo />
          </UserProfileStyle>

          <UserPlanerStatus plans={user.plans} />
        </>
      )}
    </AppLayout>
  );
};


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';

  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_PROFILE_INFO_REQUEST,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default mypage;
