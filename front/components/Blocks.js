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
import { LOAD_DAY_BLOCK_REQUEST,  LOAD_MONTH_BLOCK_REQUEST,  LOAD_WEEK_BLOCK_REQUEST,} from "../reducers/block";


const Blocks = () => {
  const { user } = useSelector((state) => state.user);
  //오늘 날짜
  const { curDate, dateArr, blockType , changeTypeDatesDone} = useSelector((state) => state.block);
  const dispatch = useDispatch();
    //날짜 팝업
  const [isPopOpen, setIsPopOpen] = useState(false);
  
    //키워드 세팅 팝업
  const [isKeywordPopOpen, setIsKeywordPopOpen] = useState(false);
  
  const [type, setType] = useState(blockType);
  const [dateValue, onChangeDate] = useState(curDate ? new Date(curDate) : new Date());
  const [getData, setGetData] = useState(false);

  useEffect(() => {
    if (user && user.userid) {
      getLoadBlockRequest(type,dateValue);
    }
  }, [type,user && user.userid]);

  useEffect(() => {
    onChangeDate(new Date(curDate));
  },[curDate])

  useEffect(() => {
    setType(blockType);
    
  },[dateValue])

  useEffect(() => {
    if(getData){
      getLoadBlockRequest(type,dateValue);
      setGetData(false);
    }

  },[getData]);

  const getLoadBlockRequest = (type,dateValue) => {
    switch(type){
      case "일간" : 
        dispatch({
          type: LOAD_DAY_BLOCK_REQUEST,
          data: {
            curDate: moment(dateValue).format("YYYY-MM-DD"),
          },
        });
        break;
      case "주간":
        dispatch({
          type: LOAD_WEEK_BLOCK_REQUEST,
          data: {
            curDate: moment(dateValue).format("YYYY-MM-DD"),
          },
        });
        break;
      case "월간":
        dispatch({
          type: LOAD_MONTH_BLOCK_REQUEST,
          data: {
            curDate: moment(dateValue).format("YYYY-MM-DD"),
          },
        });
        break;
      default : 
        dispatch({
          type: LOAD_DAY_BLOCK_REQUEST,
          data: {
            curDate: moment(dateValue).format("YYYY-MM-DD"),
          },
        });
        break;
    }
  };
  

  const onDateClick = useCallback((e) =>{
    console.log('e',e);
    onChangeDate(new Date(e));
    setGetData(true);
  },[dateValue])

  const getBlockData = useCallback(() => {
    getLoadBlockRequest(type,dateValue);
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
          {type === "일간" ? (
            <DayBlock />
          ) : type === "주간" ? (
            <WeekBLock />
          ) : (
            <MonthBlock setGetData={setGetData}/>
          )} 
    </>
  );
};

export default Blocks;