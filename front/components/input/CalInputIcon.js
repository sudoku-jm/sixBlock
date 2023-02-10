import { forwardRef } from "react";
import { TiCalendar } from "react-icons/ti";

export const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <TiCalendar onClick={onClick} />
));
