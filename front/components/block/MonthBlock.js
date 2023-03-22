import moment from "moment";
import { useCallback, useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { CalendarContEl, MonthBlockContEl } from "../../style/BlockStyle";
import KeywordModal from "./KeywordModal";

const MonthBlock = () => {
  const { monthBlock, curDate } = useSelector((state) => state.block);
  console.log("month", monthBlock);

  const onSelectDate = useCallback((date) => {
    console.log('date',date) //형식 : Thu Mar 23 2023 00:00:00 GMT+0900 (한국 표준시)
    // setIsPopOpen(true);
  }, []);

  // const [isPopOpen, setIsPopOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(curDate);

  return (
    <>
      <MonthBlockContEl>
        <h3>월간 {curDate}</h3>
        <CalendarContEl type={"month_cal"}>
          <Calendar
            onChange={(date) => {
              onSelectDate(date);
            }}
            formatDay={(locale, date) => moment(date).format("DD")}
            tileContent={(date, view) => {
              return (
                <div className="dot_container block_container">
                   {monthBlock.map((day) => {
                    //날짜가 일치할 경우
                    if (day.date === moment(date.date).format("YYYY-MM-DD")) {
                      return (
                        <div key={day.date}>
                          ddd
                        </div>
                      )
                      // let blockDot = [];
                      // for (let i = 1; i <= blockArr.length; i++) {
                      //   //일치하는 타임이 있으면 색상을 넣어 준다
                      //   let isActive = day.planList.find((num) => num === i)
                      //     ? "active"
                      //     : "";
                      //   blockDot.push(
                      //     <div
                      //       key={`${day.date}_${i}`}
                      //       className={`block ${isActive}`}
                      //     ></div>
                      //   );
                      }
                      // return blockDot;
                    }
                  )}
                </div>
              );
              // }
            }}
          />
        </CalendarContEl>
      </MonthBlockContEl>
      {/* {isPopOpen && (
        <KeywordModal
          type={"month"}
          blockData={moment(date).format("YYYY-MM-DD")}
          setIsModalOpen={setIsPopOpen}
        />
      )} */}
    </>
  );
};

export default MonthBlock;
