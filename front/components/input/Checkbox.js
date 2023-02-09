import React from "react";
import { CheckboxEl } from "../../style/BlockStyle";
import { TiTick } from "react-icons/ti";

const Checkbox = ({ name, checked, onChange }) => {
  return (
    <CheckboxEl>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={name}
          name={name}
        />
      <label htmlFor={name}>
        <span></span>
        <TiTick className="check_icon" />
      </label>
    </CheckboxEl>
  );
};

export default Checkbox;
