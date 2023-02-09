import { useCallback, useEffect, useState } from "react";
import { DayBlockContainerEl } from "../style/BlockStyle";
import Day from "./block/Day";

const DayBlock = () => {
  const [blockCheck, setBlockCheck] = useState([]);
  let blockCount = 6;
  useEffect(() => {
    console.log("blockCheck", blockCheck);
  }, [blockCheck]);

  const handleBlockCheck = (checked, blockNum) => {
    if (checked) {
      setBlockCheck((prev) => [...prev, blockNum]);
    } else {
      setBlockCheck(blockCheck.filter((block) => block !== blockNum));
    }
  };
  return (
    <>
      <DayBlockContainerEl>
        <h3>Morning</h3>
        <div>
          <Day
            blockNum={0}
            isblockCheck={blockCheck.includes(0)}
            handleBlockCheck={handleBlockCheck}
          />
          <Day
            blockNum={1}
            isblockCheck={blockCheck.includes(1)}
            handleBlockCheck={handleBlockCheck}
          />
        </div>
      </DayBlockContainerEl>

      <DayBlockContainerEl>
        <h3>Afternoon</h3>
        <div>
          <Day
            blockNum={2}
            isblockCheck={blockCheck.includes(2)}
            handleBlockCheck={handleBlockCheck}
          />
          <Day
            blockNum={3}
            isblockCheck={blockCheck.includes(3)}
            handleBlockCheck={handleBlockCheck}
          />
        </div>
      </DayBlockContainerEl>

      <DayBlockContainerEl>
        <h3>Dinner</h3>
        <div>
          <Day
            blockNum={4}
            isblockCheck={blockCheck.includes(4)}
            handleBlockCheck={handleBlockCheck}
          />
          <Day
            blockNum={5}
            isblockCheck={blockCheck.includes(5)}
            handleBlockCheck={handleBlockCheck}
          />
        </div>
      </DayBlockContainerEl>
    </>
  );
};

export default DayBlock;
