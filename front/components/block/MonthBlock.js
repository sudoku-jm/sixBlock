import moment from "moment";
import { useCallback, useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { CalendarContEl, MonthBlockContEl } from "../../style/BlockStyle";
import KeywordModal from "./KeywordModal";

const MonthBlock = () => {
  const { monthBlock, blockArr } = useSelector((state) => state.block);
  console.log("month", monthBlock);

  const onSelectDate = useCallback((date) => {
    setDate(date);
    setIsPopOpen(true);
  }, []);

  const [isPopOpen, setIsPopOpen] = useState(false);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  return (
    <>
      <MonthBlockContEl>
        <CalendarContEl type={"month_cal"}>
          <Calendar
            onChange={(date) => {
              onSelectDate(date);
            }}
            tileContent={(date, view) => {
              return (
                <div className="dot_container block_container">
                  {monthBlock.map((day) => {
                    //날짜가 일치할 경우
                    if (day.date === moment(date.date).format("YYYY-MM-DD")) {
                      //타임별 블록을 만들어준 후
                      let blockDot = [];
                      for (let i = 1; i <= blockArr.length; i++) {
                        //일치하는 타임이 있으면 색상을 넣어 준다
                        let isActive = day.planList.find((num) => num === i)
                          ? "active"
                          : "";
                        blockDot.push(
                          <div
                            key={`${day.date}_${i}`}
                            className={`block ${isActive}`}
                          ></div>
                        );
                      }
                      return blockDot;
                    }
                  })}
                </div>
              );
              // }
            }}
          />
        </CalendarContEl>
      </MonthBlockContEl>
      {isPopOpen && (
        <KeywordModal
          type={"month"}
          blockData={date}
          setIsModalOpen={setIsPopOpen}
        />
      )}
    </>
  );
};

export default MonthBlock;
