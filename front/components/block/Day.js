import { DayBlockEl } from "../../style/BlockStyle";
import Checkbox from "../input/Checkbox";
import InputText from "../input/Input";

const Day = ({ blockNum, isblockCheck, handleBlockCheck }) => {
  console.log("isBLockCheck", blockNum, isblockCheck);

  return (
    <DayBlockEl isblockCheck={isblockCheck}>
      <Checkbox
        checked={isblockCheck && "checked"}
        onChange={(e) => handleBlockCheck(e.target.checked, blockNum)}
      />
      <InputText blockActive={isblockCheck} />
    </DayBlockEl>
  );
};

export default Day;
