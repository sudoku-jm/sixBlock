import { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { SelectBoxEl } from "../../style/BlockStyle";

const Selectbox = ({ type, disabled, defaultValue, selectList, onChange }) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  return (
    <SelectBoxEl
      type={type}
      className={disabled ? "disabled" : ""}
      show={isShowOptions}
      onClick={() => disabled || setIsShowOptions((prev) => !prev)}
    >
      <label>{defaultValue}</label>

      {isShowOptions || <TiArrowSortedDown className="ico_select" />}
      {isShowOptions && <TiArrowSortedUp className="ico_select" />}

      {disabled || (
        <ul>
          {selectList.map((item) => (
            <li
              key={item}
              className={defaultValue === item ? "selected_value" : ""}
              onClick={(e) => onChange(e.target.innerText)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </SelectBoxEl>
  );
};

export default Selectbox;
