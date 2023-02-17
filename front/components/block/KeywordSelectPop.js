import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { KeywordSelectModalEl } from "../../style/BlockStyle";

const KeywordSelectPop = ({ text }) => {
  const { keywordList } = useSelector((state) => state.keyword);
  const [inputKeywordList, setInputKeywordList] = useState([]);
  useEffect(() => {
    setInputKeywordList(
      keywordList.filter((keyword) =>
        keyword.keyword.toUpperCase().includes(text.toUpperCase())
      )
    );
  }, [text]);
  console.log("inputlist", text, inputKeywordList);
  return (
    <KeywordSelectModalEl>
      <ul className="input_keyword">
        {text !== "" &&
          inputKeywordList.length > 0 &&
          inputKeywordList.map((keywordObj) => {
            const { seq, keyword } = keywordObj;
            return <li key={seq}>{keyword}</li>;
          })}
      </ul>
      <ul>
        {text !== "" &&
          keywordList &&
          keywordList.map((keywordObj) => {
            const { seq, keyword } = keywordObj;
            return <li key={seq}>{keyword}</li>;
          })}
      </ul>
    </KeywordSelectModalEl>
  );
};

export default KeywordSelectPop;
