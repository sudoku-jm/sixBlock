import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DayBlockEl } from "../../style/BlockStyle";
import { CheckboxEl } from "../../style/BlockStyle";
import { TiTick } from "react-icons/ti";
import InputText from "../input/Input";
import { INSERT_DAY_BLOCK_REQUEST } from "../../reducers/block";
import useDebounce from "../../hooks/useDebounce";

const Day = ({day}) => {

  const {Datetime, isFinished, Keyword, CodeName} = day;
  const [text, setText] = useState(Keyword?.keyword);
  const [chk, setChk] = useState(isFinished == "Y" ? true : false);
  const [insert, setInsert] = useState(false);
  const dispatch = useDispatch();

  //input change
  const debounceChange = (e) => {
    setText(e.target.value);
    setInsert(true);
  }

  let timer;
  const debounceChangeChk = (e) => {
    const {checked} = e.target;
    setChk(checked);
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      dispatchInsert(text, checked);
    },500);
  };
  
  const dispatchInsert = (val,checked) => {
    console.log('checked',checked)
  
    dispatch({
      type : INSERT_DAY_BLOCK_REQUEST,
      data : {
        curDate : Datetime?.fullDate,
        keyword : val,
        isFinished : val ? checked ? 'Y' : 'N' : 'N',
        code : CodeName
      }
    });
  };

  //debounce 처리된 input 값
  const debounceValueChange = (val) => {
    if(insert){
      console.log('val',val)
      dispatchInsert(val,chk);
      setInsert(false);
    }
  };

  //디바운스 시간 처리 및 함수 호출
  const debouncedTerm = useDebounce(text, 500);

  //debounce 실시간 처리
  useEffect(() => {
    debounceValueChange(debouncedTerm);
  }, [debouncedTerm]);


  return (
    <DayBlockEl>
      <InputText
        text={text}
        onChange={debounceChange}
      />
      <CheckboxEl>
          <input
            type="checkbox"
            checked={text ? chk : false}
            onChange={debounceChangeChk}
            id={CodeName}
            name={CodeName}
          />
        <label htmlFor={CodeName}>
          <TiTick className="check_icon" />
        </label>
      </CheckboxEl>

    </DayBlockEl>
  );
};

export default Day;
