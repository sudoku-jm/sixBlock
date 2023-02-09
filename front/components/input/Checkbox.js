import React from "react";
import { CheckboxEl } from "../../style/BlockStyle";

const Checkbox = ({ text, name, checked, onChange }) => {
  return (
    <CheckboxEl>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={name}
          name={name}
        />
        <span>{text}</span>
      </label>
      <div className="check">
        <div className="inside"></div>
      </div>
    </CheckboxEl>
  );
};

export default Checkbox;
