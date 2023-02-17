import { useCallback, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import { WeekBlockContainerEl } from "../../style/BlockStyle";
import KeywordModal from "./KeywordModal";

const WeekBlock = () => {
  const { weekBlock } = useSelector((state) => state.block);
  console.log("weekBlock", weekBlock);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockData, setBlockData] = useState({});
  const openKeywordModal = useCallback(() => {
    setIsModalOpen(true);
  }, [isModalOpen]);

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
        {weekBlock &&
          weekBlock.map((week) => {
            const { day, date, weekData } = week;

            return (
              <div className="week_content_each" key={date}>
                <h3>{day.substring(0, 3)}</h3>
                <ul>
                  {weekData.map((day) => {
                    const { type, blockData } = day;
                    return blockData.map((block) => {
                      const { seq,  content, isFinished, } =
                        block;
                      return (
                        <li
                          key={seq}
                          onClick={() => {
                            setBlockData(block);
                            openKeywordModal();
                          }}
                          className={isFinished ? "finished_block" : ""}
                        >
                          {isFinished && <TiTick className="finished_icon" />}
                          {content !== "" ? (
                            <span className="dotdot active_text">{content}</span>
                          ) : (
                            <span className="dotdot dimmed_text">{type}</span>
                          )}
                        </li>
                      );
                    });
                  })}
                </ul>
              </div>
            );
          })}
      </div>
      {isModalOpen && (
        <KeywordModal setIsModalOpen={setIsModalOpen} blockData={blockData} />
      )}
    </WeekBlockContainerEl>
  );
};

export default WeekBlock;
