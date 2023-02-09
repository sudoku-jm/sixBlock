import { InputEl } from "../../style/BlockStyle";

const InputText = ({ text, name, onChange, blockActive }) => {
  return (
    <InputEl
      type="text"
      name={name}
      value={text}
      onChange={onChange}
      disabled={blockActive ? true : false}
    ></InputEl>
  );
};

export default InputText;
