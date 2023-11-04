import { useCallback, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { WeekBlockContainerEl } from "../../style/BlockStyle";
import KeywordModal from "./KeywordModal";
import useChangeWeekName from "../../hooks/useChangeWeekName";
import { CHANGE_TYPE_DATE_BLOCK_REQUEST } from "../../reducers/block";
import moment from "moment";
const WeekBlock = () => {
  const dispatch = useDispatch();
  const { weekBlock,curDate } = useSelector((state) => state.block);
  console.log("weekBlock", weekBlock);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockData, setBlockData] = useState({});
  const openKeywordModal = useCallback(() => {
    setIsModalOpen(true);
  }, [isModalOpen]);


  const onSelectDate = useCallback((w) =>{
    console.log('???',w)
    fetchChangeBlockType(w.date);
  },[]);

  const fetchChangeBlockType = (date) => {
    dispatch({
      type : CHANGE_TYPE_DATE_BLOCK_REQUEST,
      data : {
        type : "일간",
        curDate :  moment(date).format("YYYY-MM-DD"),
      }
    });
  }
  

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
                      const {Keyword, CodeName, Datetime,isFinished} = day;
                      return (
                        Keyword?.keyword == "" ? <>
                          <li key={day.id ? day.id : idx} className="" onClick={() => onSelectDate(w)}>
                           -
                          </li>
                        </>:
                        <>
                          <li key={day.id ? day.id : idx} className={isFinished=='Y'?'finished_block' : 'ing'} onClick={() => onSelectDate(w)}>
                            {/* <span>{Keyword?.keyword}/{CodeName}</span> */}
                            <span>{Keyword?.keyword}</span>
                          </li>
                        </>
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
