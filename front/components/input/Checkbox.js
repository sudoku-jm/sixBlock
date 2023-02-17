import React from "react";
import { CheckboxEl } from "../../style/BlockStyle";
import { TiTick } from "react-icons/ti";

const Checkbox = ({ name, checked, text, onChange }) => {
  return (
    <CheckboxEl isText={text ? true : false}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={name}
          name={name}
        />
      <label htmlFor={name}>
        <TiTick className="check_icon" />
        <span>{text}</span>
      </label>
    </CheckboxEl>
  );
};

export default Checkbox;
