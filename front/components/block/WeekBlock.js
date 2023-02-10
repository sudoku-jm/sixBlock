import { useSelector } from "react-redux";
import { WeekBlockContainerEl } from "../../style/BlockStyle";

const WeekBlock = () => {
  const weekArr = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const { weekBlock } = useSelector((state) => state.block);
  console.log("weekBlock", weekBlock);
  return (
    <WeekBlockContainerEl>
      <div className="week_title">
        <ul>
          <li>Morning</li>
          <li>Afternoon</li>
          <li>Dinner</li>
        </ul>
      </div>
      <div className="week_content">
        {weekArr.map((day, idx) => (
          <div className="week_content_each" key={idx}>
            <h3>{day.substring(0, 3)}</h3>
            <ul>
              <li>아침1</li>
              <li>아침2</li>
              <li>점심1</li>
              <li>점심2</li>
              <li>저녁1</li>
              <li>저녁2</li>
            </ul>
          </div>
        ))}
      </div>
    </WeekBlockContainerEl>
  );
};

export default WeekBlock;
