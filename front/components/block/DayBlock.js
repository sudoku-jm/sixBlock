import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import datetime from "../../../back/models/datetime";
import { DayBlockContainerEl } from "../../style/BlockStyle";
import Day from "./Day";

const DayBlock = () => {
  const { dayBlock , curDate} = useSelector((state) => state.block);

  return (
    <DayBlockContainerEl>
      <h3>일간 {curDate}</h3>
      <div>
      {
      dayBlock.map((day , idx) => 
        {
          return <Day key={day.id ? day.id : idx} day={day}/>
        }
      )
      }
      </div>
    </DayBlockContainerEl>
  );
};

export default DayBlock;
