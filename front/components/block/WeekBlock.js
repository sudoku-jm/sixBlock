import { useCallback, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import { WeekBlockContainerEl } from "../../style/BlockStyle";
import Checkbox from "../input/Checkbox";
import KeywordModal from "./KeywordModal";

const WeekBlock = () => {
  const blockArr = [
    "Morning",
    "Morning",
    "Afternoon",
    "Afternoon",
    "Dinner",
    "Dinner",
  ];
  const { weekBlock } = useSelector((state) => state.block);
  console.log("weekBlock", weekBlock);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockData, setBlockData] = useState({});
  const openKeywordModal = useCallback((blockDate, blockType, blockNum) => {
    setIsModalOpen(true);
  }, []);

  return (
    <WeekBlockContainerEl>
      <div className="week_title">
        <ul>
          {[...new Set(blockArr)].map((block, idx) => (
            <li key={idx}>{block}</li>
          ))}
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
                    return (
                      <>
                        {blockData.map((block) => {
                          const { seq, typeNum, content, isFinished, regDate } =
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
                              {isFinished && (
                                <TiTick className="finished_icon" />
                              )}
                              {content !== "" ? (
                                <span className="active_text">{content}</span>
                              ) : (
                                <span className="dimmed_text">{type}</span>
                              )}
                            </li>
                          );
                        })}
                      </>
                    );
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
