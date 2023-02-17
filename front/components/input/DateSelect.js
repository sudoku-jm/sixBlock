import { useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarContEl, DimmedBG } from "../../style/BlockStyle";
import moment from "moment";

const DateSelect = ({ date, dateArr, setIsPopOpen, onChange }) => {

  return (
    <>
      <DimmedBG onClick={() => setIsPopOpen(false)} />
      <CalendarContEl>
        <Calendar
          value={new Date(date)}
          onChange={(date) => {
            onChange(date);
          }}
          formatDay={(locale, date) => moment(date).format("DD")}
          tileContent={(date, view) => {
            if (
              dateArr.find((d) => d === moment(date.date).format("YYYY-MM-DD"))
            ) {
              return (
                <div className="dot_container">
                  <div className="dot"></div>
                </div>
              );
            }
          }}
        />
      </CalendarContEl>
    </>
  );
};

export default DateSelect;
