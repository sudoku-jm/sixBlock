import React, { useCallback, useEffect, useState } from "react";
import { TiCalendar, TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import DayBlock from "../components/block/DayBlock";
import MonthBlock from "../components/block/MonthBlock";
import WeekBLock from "../components/block/WeekBlock";
import SelectBox from "../components/input/Selectbox";
import DateSelect from "../components/input/DateSelect";
import LoginForm from "../components/LoginForm";
import Menu from "../components/Menu";
import { SelectTitleEl } from "../style/BlockStyle";
import KeywordModal from "../components/block/KeywordModal";
import Router from "next/router";
import {
  LOAD_DAY_BLOCK_REQUEST,
  LOAD_MONTH_BLOCK_REQUEST,
  LOAD_WEEK_BLOCK_REQUEST,
} from "../reducers/block";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(user && user.userid)) {
      Router.push("/");
    }
  }, [user && user.userid]);
  //오늘 날짜
  const { curDate, dateArr } = useSelector((state) => state.block);

  //날짜 팝업
  const [isPopOpen, setIsPopOpen] = useState(false);

  //키워드 세팅 팝업
  const [isKeywordPopOpen, setIsKeywordPopOpen] = useState(false);

  const [type, setType] = useState("일간");
  const selectType = useCallback((typeValue) => {
    setType(typeValue);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.userid) {
      getBlockData();
    }
  }, [type, user && user.userid]);

  const getBlockData = useCallback(() => {
    if (type === "일간") {
      dispatch({
        type: LOAD_DAY_BLOCK_REQUEST,
        data: {
          curDate: curDate,
        },
      });
    } else if (type === "주간") {
      dispatch({
        type: LOAD_WEEK_BLOCK_REQUEST,
        data: {
          curDate: curDate,
        },
      });
    } else if (type === "월간") {
      dispatch({
        type: LOAD_MONTH_BLOCK_REQUEST,
        data: {
          curDate: curDate,
        },
      });
    }
  }, [type]);

  return (
    <AppLayout>
      {user ? (
        <>
          <Menu page="index" />
          <SelectTitleEl className="select_text">
            <SelectBox
              type={"inline"}
              defaultValue={type}
              selectList={["일간", "주간", "월간"]}
              onChange={selectType}
            />
            <div className="title_icon">
              <TiPlus onClick={() => setIsKeywordPopOpen((prev) => !prev)} />

              {type !== "월간" && (
                <TiCalendar onClick={() => setIsPopOpen((prev) => !prev)} />
              )}
              {isKeywordPopOpen && <KeywordModal />}
              {isPopOpen && (
                <DateSelect
                  date={curDate}
                  dateArr={dateArr}
                  setIsPopOpen={setIsPopOpen}
                />
              )}
            </div>
          </SelectTitleEl>
          {type === "일간" ? (
            <DayBlock />
          ) : type === "주간" ? (
            <WeekBLock />
          ) : (
            <MonthBlock />
          )}
        </>
      ) : (
        <LoginForm />
      )}
    </AppLayout>
  );
};

export default Home;
