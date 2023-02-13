import { TiTimes, TiKeyOutline, TiCalendarOutline, } from "react-icons/ti";
import { useSelector } from "react-redux";
import { KeywordModalEl, DimmedBG } from "../../style/BlockStyle";
import Checkbox from "../input/Checkbox";
const KeywordModal = ({ setIsModalOpen, blockData }) => {
  console.log("blockDat", blockData)
  const { seq, typeNum, content, isFinished, regDate } = blockData;

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
                <TiKeyOutline />
                Keyword
              </h5>
              <div>
                <select>
                  <option>11</option>
                  <option>22</option>
                  <option>33</option>
                </select>
              </div>
            </div>

            <div className="modal_content_each">
              <h5>
                <TiCalendarOutline />
                Date
              </h5>
              <div></div>
            </div>

            <div className="modal_content_each">
              <h5>Time</h5>
              <div></div>
            </div>

            <div className="modal_content_each">
              <h5>Memo</h5>
              <div></div>
            </div>
          </div>

      <div className="modal_content_each">

        <Checkbox checked={isFinished} onChange={(e)=>{console.log(e.target.checked)}} name="day_check"/>
      </div>

        </div>


        <div className="modal_btm">
          
        </div>
      </KeywordModalEl>
    </>
  );
};

export default KeywordModal;
