import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { TiCalendar, TiPlus } from "react-icons/ti";
import DayBlock from "../components/block/DayBlock";
import MonthBlock from "../components/block/MonthBlock";
import WeekBLock from "../components/block/WeekBlock";
import SelectBox from "../components/input/Selectbox";
import DateSelect from "../components/input/DateSelect";
import { SelectTitleEl } from "../style/BlockStyle";
import KeywordModal from "../components/block/KeywordModal";
import moment from "moment";
import {
  LOAD_DAY_BLOCK_REQUEST,
  LOAD_MONTH_BLOCK_REQUEST,
  LOAD_WEEK_BLOCK_REQUEST,
} from "../reducers/block";
const Blocks = () => {
  const { user } = useSelector((state) => state.user);
  //오늘 날짜
  const { curDate, dateArr } = useSelector((state) => state.block);
  const dispatch = useDispatch();
    //날짜 팝업
  const [isPopOpen, setIsPopOpen] = useState(false);
  
    //키워드 세팅 팝업
  const [isKeywordPopOpen, setIsKeywordPopOpen] = useState(false);
  
  const [type, setType] = useState("일간");
  const [dateValue, onChangeDate] = useState(curDate ? new Date(curDate) : new Date());
  const [getData, setGetData] = useState(false);

  useEffect(() => {
    if (user && user.userid) {
      getBlockData();
    }
  }, [type, user && user.userid]);

  useEffect(() => {
    if(getData){
      console.log('dateValue',dateValue)
      const date = moment(dateValue).format("YYYY-MM-DD")
      if (type === "일간") {
          dispatch({
            type: LOAD_DAY_BLOCK_REQUEST,
            data: {
              curDate: date
            },
          });
      }

      setGetData(false);
    }

  },[dateValue])

  const onDateClick = useCallback(() =>{
    setGetData(true);
  },[])

  // const onDateSelect = useCallback(() => {
  //   console.log('onDateSelect',onDateSelect)
  //   if (type === "일간") {
  //     dispatch({
  //       type: LOAD_DAY_BLOCK_REQUEST,
  //       data: {
  //         curDate: moment(dateValue).format("YYYY-MM-DD"),
  //       },
  //     });
  //   }
  // },[]);

  const getBlockData = useCallback(() => {
    if (type === "일간") {
      dispatch({
        type: LOAD_DAY_BLOCK_REQUEST,
        data: {
          curDate: moment(dateValue).format("YYYY-MM-DD"),
        },
      });
    } else if (type === "주간") {
      dispatch({
        type: LOAD_WEEK_BLOCK_REQUEST,
        data: {
          curDate: dateValue,
        },
      });
    } else if (type === "월간") {
      dispatch({
        type: LOAD_MONTH_BLOCK_REQUEST,
        data: {
          curDate: dateValue,
        },
      });
    }
  }, [type]);

  const selectType = useCallback((typeValue) => {
    setType(typeValue);
  }, []);
  

  return (
    <>
       <SelectTitleEl className="select_text">
            <SelectBox
              type={"inline"}
              defaultValue={type}
              selectList={["일간", "주간", "월간"]}
              onChange={selectType}
            />
            <div className="title_icon">
              {/* <TiPlus onClick={() => setIsKeywordPopOpen((prev) => !prev)} /> */}
              {/* {isKeywordPopOpen && <KeywordModal />} */}

              {type !== "월간" && (
                <TiCalendar onClick={() => setIsPopOpen((prev) => !prev)} />
              )}
              {isPopOpen && (
                <DateSelect
                  date={dateValue}
                  dateArr={dateArr}
                  setIsPopOpen={setIsPopOpen}
                  onChangeDate={onChangeDate}
                  onDateClick={onDateClick}
                />
              )}
            </div>
          </SelectTitleEl>
          <DayBlock />
          {/* {type === "일간" ? (
            <DayBlock />
          ) : type === "주간" ? (
            <WeekBLock />
          ) : (
            <MonthBlock />
          )} */}
    </>
  );
};

export default Blocks;