import { InputEl } from "../../style/BlockStyle";

const InputText = ({ text, name, onChange, blockActive }) => {
  return (
    <InputEl
      name={name}
      value={text}
      onChange={onChange}
      disabled={blockActive ? true : false}
    ></InputEl>
  );
};

export default InputText;
