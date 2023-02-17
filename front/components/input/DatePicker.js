import { useCallback, useRef } from "react";
import DatePicker from "react-datepicker";
import { DatePickerContEl } from "../../style/BlockStyle";
import { CustomInput } from "./CalInputIcon";
import { ko } from "date-fns/locale";


const DatePickerItem = ({date}) => {
  const ref = useRef();
  
  const handleDateChange = useCallback((date)=>{
    console.log("handleDateChane", date)
    
  },[])

  return (
    <DatePickerContEl>
      <DatePicker
        selected={new Date(date)}
        wrapperClassName="datePicker"
        customInput={<CustomInput ref={ref} />}
        onChange={(date) => handleDateChange(date)}
        dateFormat="yyyy.MM.dd"
        // showYearDropdown
        // showMonthDropdown
        locale={ko}
      />
    </DatePickerContEl>
  );
};

export default DatePickerItem;
