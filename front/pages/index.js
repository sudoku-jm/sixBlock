import React, { useCallback, useState } from "react";
import { TiCalendar } from "react-icons/ti";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import DayBlock from "../components/block/DayBlock";
import MonthBlock from "../components/block/MonthBlock";
import WeekBLock from "../components/block/WeekBlock";
import SelectBox from "../components/input/Selectbox";
import DateSelect from "../components/input/DateSelect";
import LoginForm from "../components/LoginForm";
import Menu from "../components/Menu";
import { SelectTitleEl } from "../style/BlockStyle";

const Home = () => {
  const { logInDone } = useSelector((state) => state.user);
  
  //오늘 날짜
  const { curDate, dateArr } = useSelector((state) => state.block);

  //날짜 팝업
  const [isPopOpen, setIsPopOpen] = useState(false);

  const [type, setType] = useState("일간");
  const selectType = useCallback((typeValue) => {
    console.log("type", typeValue)
    setType(typeValue);
  }, []);

  return (
    <AppLayout>
      {logInDone ? (
        <>
          <Menu page="index" />
          <SelectTitleEl className="select_text">
            <SelectBox
              defaultValue={type}
              onChange={selectType}
            />
            {/* <DatePickerItem date={curDate} /> */}
            <TiCalendar onClick={() => setIsPopOpen((prev) => !prev)} />
            {isPopOpen && (
              <DateSelect
                date={curDate}
                dateArr={dateArr}
                setIsPopOpen={setIsPopOpen}
              />
            )}
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
