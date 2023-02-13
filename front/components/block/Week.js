import { useCallback } from "react";

const Week = ({block}) => {
 const openKeywordModal = useCallback(() => {
   
 }, []);
  return (
    <li
      onClick={() => {
        openKeywordModal();
      }}
    >
      <span className="dimmed_text">{block}</span>
    </li>
  );
};

export default Week;
