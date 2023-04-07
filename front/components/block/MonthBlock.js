import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_TYPE_DATE_BLOCK_REQUEST, LOAD_MONTH_BLOCK_REQUEST } from "../../reducers/block";
import { CalendarContEl, MonthBlockContEl } from "../../style/BlockStyle";
import KeywordModal from "./KeywordModal";

const MonthBlock = ({}) => {
  const dispatch = useDispatch();
  const { monthBlock, curDate } = useSelector((state) => state.block);
  const [otherMonthDay, setOtherMonthDay] = useState('');
  const onSelectDate = useCallback((date) => {
    if(otherMonthDay == "" || otherMonthDay == null){
      console.log('111date',date)
      fetchChangeBlockType(date);
    }else{
      console.log('222date',date)
      fetchChangeBlockType(otherMonthDay);
      setOtherMonthDay('');
    }
  }, [otherMonthDay]);

  // 달이 바뀔 경우
  const onChangeMonth = useCallback((e) => {
    const date = e.value;
    const startDate = e.activeStartDate;
    if(date == undefined){
      dispatch({
        type: LOAD_MONTH_BLOCK_REQUEST,
        data: {
          curDate: moment(startDate).format("YYYY-MM-DD"),
        },
      });
    }else{
      setOtherMonthDay(date);
    }
  },[]);


  const fetchChangeBlockType = (date) => {
    dispatch({
      type : CHANGE_TYPE_DATE_BLOCK_REQUEST,
      data : {
        type : "일간",
        curDate :  moment(date).format("YYYY-MM-DD"),
      }
    });
  }
  

  return (
    <>
      <MonthBlockContEl>
        <h3>월간 {curDate}</h3>
        <CalendarContEl type={"month_cal"}>
          <Calendar
            activeStartDate = {new Date(curDate)}
            onActiveStartDateChange={(e) => onChangeMonth(e)}
            // showNeighboringMonth={false} //다른 달 날짜 안보임
            onChange={(date) => {
              onSelectDate(date);
            }}
            formatDay={(locale, date) => moment(date).format("DD")}
            tileContent={(date, view) => {
              return (
                <div className="block_container">
                   {monthBlock?.map((day) => {
                    //날짜가 일치할 경우
                    if (day.date === moment(date.date).format("YYYY-MM-DD")) {
                      return (
                        <div key={day.date} date-day={day.date} className="block_container_inner">
                          {
                            day.blocks?.map((b) => {
                              return b.isFinished == 'N' ? 
                              <span className="block no" key={b.CodeName}>N</span>
                              :
                              <span className="block yes" key={b.CodeName}>Y</span>
                              }
                            )
                          }
                        </div>
                      )
                    }
                })}
                </div>
              );
              // }
            }}
          />
        </CalendarContEl>
      </MonthBlockContEl>


    </>
  );
};

export default MonthBlock;
