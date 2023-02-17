import { useCallback, useState } from "react";
import {
  TiTimes,
  TiKeyOutline,
  TiCalendarOutline,
  TiCalendar,
} from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { handleDayBlock } from "../../reducers/block";
import { KeywordModalEl, DimmedBG } from "../../style/BlockStyle";
import KeywordSelectPop from "./KeywordSelectPop";
import Checkbox from "../input/Checkbox";
import DateSelect from "../input/DateSelect";
import Selectbox from "../input/Selectbox";
const KeywordModal = ({ type, blockData, setIsModalOpen }) => {
  const dispatch = useDispatch();

  const { keywordList } = useSelector((state) => state.keyword);
  const { blockArr } = useSelector((state) => state.block);

  const [currentBlock, setCurrentBlock] = useState(blockData);
  const handleCurrentBlock = useCallback(
    (e, text) => {
      if (text) {
        setCurrentBlock({
          ...currentBlock,
          type: text.replace(/[0-9]/g, ""),
        });
      } else {
        const { name, value, checked } = e.target;
        setCurrentBlock({
          ...currentBlock,
          [name]: name === "isFinished" ? checked : value,
        });
      }
    },
    [currentBlock]
  );

  const [isDatePopOpen, setIsDatePopOpen] = useState(false);

  const [isKeywordPopOpen, setIsKeywordPopOpen] = useState(false);

  const setCurrentBlockAction = useCallback(() => {
    dispatch(handleDayBlock(currentBlock));
    setIsModalOpen(false);
  }, [currentBlock]);

  return (
    <>
      <DimmedBG onClick={() => setIsModalOpen(false)} />
      <KeywordModalEl>
        <div className="modal_inner">
          <div className="modal_close" onClick={() => setIsModalOpen(false)}>
            <TiTimes />
          </div>
          <div className="modal_title">
            <h4>DayBlock Plan</h4>
          </div>

          <div className="modal_content">
            <div className="modal_content_each">
              <h5>
                {/* <TiKeyOutline /> */}
                Keyword
              </h5>
              <div>
                <input
                  type="text"
                  name="content"
                  value={currentBlock.content}
                  onChange={(e) => {
                    handleCurrentBlock(e);
                    setIsKeywordPopOpen(true)
                  }}
                />
                {isKeywordPopOpen && <KeywordSelectPop text={currentBlock.content}/>}
              </div>
            </div>

            <div className="modal_content_each">
              <h5>
                {/* <TiCalendarOutline /> */}
                Date
              </h5>
              <div>
                <span>{currentBlock.date}</span>
                <TiCalendar onClick={() => setIsDatePopOpen((prev) => !prev)} />
                {isDatePopOpen && (
                  <DateSelect
                    date={currentBlock.date}
                    dateArr={[]}
                    setIsPopOpen={setIsDatePopOpen}
                  />
                )}
              </div>
            </div>

            <div className="modal_content_each">
              <h5>Time</h5>
              <div>
                <Selectbox
                  type={"block"}
                  disabled={true}
                  defaultValue={`${currentBlock.type}${currentBlock.typeNum}`}
                  selectList={blockArr}
                  onChange={(text) => {
                    handleCurrentBlock(null, text);
                  }}
                />
              </div>
            </div>
            <div className="modal_content_each">
              <Checkbox
                checked={currentBlock.isFinished}
                onChange={(e) => {
                  handleCurrentBlock(e);
                }}
                name="isFinished"
                text="Done"
              />
            </div>
          </div>

          <div className="modal_btm">
            <button
              className="btnM btnRound btn-primary"
              onClick={setCurrentBlockAction}
            >
              Apply
            </button>
            <button className="btnM btnRound btn-grey">Delete</button>
          </div>
        </div>
      </KeywordModalEl>
    </>
  );
};

export default KeywordModal;
