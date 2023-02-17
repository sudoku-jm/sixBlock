import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { KeywordSelectModalEl } from "../../style/BlockStyle";

const KeywordSelectPop = ({ text,handleCurrentBlock, setIsKeywordPopOpen }) => {
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

  const setKeyword = useCallback((keyword) => {
    handleCurrentBlock(null, keyword, 'content')
    setIsKeywordPopOpen(false)
  }, []);
  return (
    <KeywordSelectModalEl>
      <ul className="input_keyword">
        {text !== "" &&
          inputKeywordList.length > 0 &&
          inputKeywordList.map((keywordObj) => {
            const { seq, keyword } = keywordObj;
            return (
              <li onClick={() => setKeyword(keyword)} key={seq}>
                {keyword}
              </li>
            );
          })}
      </ul>
      <ul>
        {text !== "" &&
          keywordList &&
          keywordList.map((keywordObj) => {
            const { seq, keyword } = keywordObj;
            return (
              <li onClick={() => setKeyword(keyword)} key={seq}>
                {keyword}
              </li>
            );
          })}
      </ul>
    </KeywordSelectModalEl>
  );
};

export default KeywordSelectPop;
