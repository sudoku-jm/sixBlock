import { useCallback, useEffect, useState } from "react";
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
  console.log("keywordmodal================", type, blockData);

  const dispatch = useDispatch();

  const { blockArr, weekBlock } = useSelector((state) => state.block);

  //input 시 내용 저장
  const [currentBlock, setCurrentBlock] = useState(
    type === "month"
      ? weekBlock
          .find((d) => d.date === blockData)
          ?.weekData.find((w) => w.date === blockData)
          ?.blockData.find((b) => b.date === blockData)
      : blockData
  );

  useEffect(()=>{console.log("curbLOCK", currentBlock)},[currentBlock])
  
  const handleCurrentBlock = useCallback(
    (e, text, nameType) => {
      console.log("handlecurrentblock", e, text)
      if (text) {
        setCurrentBlock({
          ...currentBlock,
          [nameType]: text.replace(/[0-9]/g, ""),
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
    // dispatch(handleDayBlock(currentBlock));
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
                  onClick={()=>setIsKeywordPopOpen(true)}
                  onChange={(e) => {
                    handleCurrentBlock(e, e.target.value, 'content');
                    setIsKeywordPopOpen(true);
                  }}
                />
                {isKeywordPopOpen && (
                  <KeywordSelectPop
                    text={currentBlock.content}
                    handleCurrentBlock={handleCurrentBlock}
                    setIsKeywordPopOpen={setIsKeywordPopOpen}
                  />
                )}
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
                    handleCurrentBlock(null, text, 'type');
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
