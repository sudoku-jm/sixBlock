import React from "react";
import { useSelector } from "react-redux";
import { DayBlockContainerEl } from "../../style/BlockStyle";
import Day from "./Day";

const DayBlock = () => {
  const { dayBlock, blockCont } = useSelector((state) => state.block);
  const dateArr = Array.from({ length: 5 }, (v, i) => blockCont);
  console.log("dayBlock", dateArr, dayBlock, blockCont);

  return (
    <>
      {dayBlock && (
        <DayBlockContainerEl key={1}>
          {dateArr.map((idx, bCont) => {
            console.log("???");
            const { id, isFinished, userId, DatetimeId, CodeName, KeywordId } = bCont;

            return (
              <>
                <h3>aasdfasdfasdf</h3>
                <div>
                  <Day key={idx} day={1} dayType={1} />
                </div>
              </>
            );
            // <DayBlockContainerEl key={type}>
            //   <h3>{type}</h3>
            //   <div>
            //     {blockData.map((day) => {
            //       return <Day key={day.seq} day={day} dayType={type} />;
            //     })}
            //   </div>
            // </DayBlockContainerEl>
          })}
        </DayBlockContainerEl>
      )}
    </>
  );
};

export default DayBlock;
