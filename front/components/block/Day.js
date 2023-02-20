import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkDayBlock, unCheckDayBlock } from "../../reducers/block";
import { DayBlockEl } from "../../style/BlockStyle";
import Checkbox from "../input/Checkbox";
import InputText from "../input/Input";

const Day = ({ day, dayType }) => {
  const { seq, content, isFinished } = day;
  console.log("seq, isFinished ", seq, isFinished, content);
  const dispatch = useDispatch();
  const [text, setText] = useState(content);

  const handleText = (e) => {
    const { value } = e.target;
    value !== "" && setText(value);
  };

  // const handleBlockCheck = (checked, seq) => {
  //   if (isFinished) { //이미 체크된 경우 > 해제
  //     console.log("111", isFinished);
  //     dispatch(unCheckDayBlock(dayType, seq));
  //   } else { //체크 처리
  //     console.log("222", isFinished);
  //     dispatch(checkDayBlock(dayType, seq, text));
  //   }
  // };

  return (
    <DayBlockEl isblockCheck={isFinished}>
      <InputText
        blockActive={isFinished}
        text={text}
        onChange={(e) => handleText(e)}
      />
      <Checkbox
        checked={isFinished}
        onChange={(e) =>
          console.log(e)
          //  handleBlockCheck(e.target.checked, seq)
        }
        name={`daycheck_${seq}`}
      />
    </DayBlockEl>
  );
};

export default Day;
