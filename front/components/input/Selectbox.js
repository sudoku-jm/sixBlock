import { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { SelectBoxEl } from "../../style/BlockStyle";

const Selectbox = ({ defaultValue, onChange }) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  return (
    <SelectBoxEl
      show={isShowOptions}
      onClick={() => setIsShowOptions((prev) => !prev)}
    >
      <label>{defaultValue}</label>

      {isShowOptions || <TiArrowSortedDown className="ico_select" />}
      {isShowOptions && <TiArrowSortedUp className="ico_select" />}

      <ul>
        <li onClick={(e) => onChange(e.target.innerText)}>일간</li>
        <li onClick={(e) => onChange(e.target.innerText)}>주간</li>
        <li onClick={(e) => onChange(e.target.innerText)}>월간</li>
      </ul>
      {/* <select defaultValue={defaultValue} onChange={onChange}>
        <option value="일간">일간</option>
        <option value="주간">주간</option>
        <option value="월간">월간</option>
      </select>
      <TiArrowSortedDown className="ico_select" /> */}
    </SelectBoxEl>
  );
};

export default Selectbox;
