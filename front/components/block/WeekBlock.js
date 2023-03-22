import { useCallback, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import { WeekBlockContainerEl } from "../../style/BlockStyle";
import KeywordModal from "./KeywordModal";
import useChangeWeekName from "../../hooks/useChangeWeekName";
const WeekBlock = () => {
  const { weekBlock,curDate } = useSelector((state) => state.block);
  console.log("weekBlock", weekBlock);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockData, setBlockData] = useState({});
  const openKeywordModal = useCallback(() => {
    setIsModalOpen(true);
  }, [isModalOpen]);

  return (
    <WeekBlockContainerEl>
      <h3>주간 {curDate}</h3>
      <div className="week_title">
        <ul>
          <li>Morning</li>
          <li>Afternoon</li>
          <li>Dinner</li>
        </ul>
      </div>
      
      <div className="week_content">
        {
          weekBlock.map((w) => {
            return (
              <div className="week_content_each" key={w.week}>
                <h3>
                  {useChangeWeekName(w.week)}<br/>
                  <em>{w.date}</em>
                </h3>
                <ul>
                  {
                    w.blocks?.map((day, idx) => {
                      const {Keyword, CodeName, Datetime} = day;
                      return (
                        <li key={day.id ? day.id : idx}>
                          <span>{Keyword?.keyword}/{CodeName}</span>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            );
          })}
      </div>
      {/* {isModalOpen && (
        <KeywordModal setIsModalOpen={setIsModalOpen} blockData={blockData} />
      )} */}
    </WeekBlockContainerEl>
  );
};

export default WeekBlock;
