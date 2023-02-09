import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DayBlockContainerEl } from "../style/BlockStyle";
import Day from "./block/Day";

const DayBlock = () => {
  const { dayBlock } = useSelector((state) => state.block);
  console.log("dayBlock", dayBlock);

  return (
    <>
      {dayBlock &&
        dayBlock.map((dayBlocks) => {
          const { type, blockData } = dayBlocks;
          return (
            <DayBlockContainerEl key={type}>
              <h3>{type}</h3>
              <div>
                {blockData.map((day) => {
                  return <Day key={day.seq} day={day} dayType={type} />;
                })}
              </div>
            </DayBlockContainerEl>
          );
        })}
    </>
  );
};

export default DayBlock;
