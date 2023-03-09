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
  console.log("keywordmodal================");

 

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
                  value={''}
                  onClick={()=>console.log("click")}
                  onChange={(e) => {
                    console.log("e", e.target.value)
                  }}
                />
                {/* {isKeywordPopOpen && (
                  <KeywordSelectPop
                    text={currentBlock.content}
                    handleCurrentBlock={handleCurrentBlock}
                    setIsKeywordPopOpen={setIsKeywordPopOpen}
                  />
                )} */}
              </div>
            </div>

            <div className="modal_content_each">
              <h5>
                {/* <TiCalendarOutline /> */}
                Date
              </h5>
              <div>
                <span>{'2023-02-27'}</span>
                <TiCalendar />
                {/* {isDatePopOpen && (
                  <DateSelect
                    date={'2023-02-27'}
                    
                  />
                )} */}
              </div>
            </div>

            <div className="modal_content_each">
              <h5>Time</h5>
              <div>
                <Selectbox
                  type={"block"}
                  disabled={true}
                />
              </div>
            </div>
            <div className="modal_content_each">
              <Checkbox
                checked={true}
                onChange={(e) => {
                  console.log("Ee")
                }}
                name="isFinished"
                text="Done"
              />
            </div>
          </div>

          <div className="modal_btm">
            <button
              className="btnM btnRound btn-primary"
              
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
