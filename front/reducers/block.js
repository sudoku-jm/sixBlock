import produce from "immer";

const initialState = {
  dayBlock: [
    {
      type: "MORNING",
      blockData: [
        {
          seq: 1,
          typeNum: 1,
          content: "test test",
          isFinished: true,
          writer: "jellyfish",
          regDate: "2023-02-09",
        },
        {
          seq: 2,
          typeNum: 2,
          content: "",
          isFinished: false,
          writer: "jellyfish",
          regDate: "2023-02-09",
        },
      ],
    },
    {
      type: "AFTERNOON",
      blockData: [
        {
          seq: 3,
          typeNum: 1,
          content: "",
          isFinished: false,
          writer: "jellyfish",
          regDate: "2023-02-09",
        },
        {
          seq: 4,
          typeNum: 2,
          content: "",
          isFinished: false,
          writer: "jellyfish",
          regDate: "2023-02-09",
        },
      ],
    },
    {
      type: "DINNER",
      blockData: [
        {
          seq: 5,
          typeNum: 1,
          content: "",
          isFinished: false,
          writer: "jellyfish",
          regDate: "2023-02-09",
        },
        {
          seq: 6,
          typeNum: 2,
          content: "",
          isFinished: false,
          writer: "jellyfish",
          regDate: "2023-02-09",
        },
      ],
    },
  ],
};

export const DAY_BLOCK_INPUT_CHECK = "DAY_BLOCK_INPUT_CHECK";
export const DAY_BLOCK_UNCHECK = "DAY_BLOCK_UNCHECK";

export const checkDayBlock = (dayType, seq, content) => {
  console.log("checkDayBlock", dayType, seq, content);
  return {
    type: DAY_BLOCK_INPUT_CHECK,
    data: {
      dayType,
      seq,
      content,
    },
  };
};
export const unCheckDayBlock = (dayType, seq) => {
  console.log("unCheckDayBlock", dayType, seq);
  return {
    type: DAY_BLOCK_UNCHECK,
    data: {
      dayType,
      seq,
    },
  };
};

const reducer = (state = initialState, action) => {
  // console.log("block", state, action);
  //일일 블록 변경하기 : action.seq , action.content 넘겨받아서 찾아서 넣어주기
  return produce(state, (draft) => {
    let curDayBlock;
    let curDay;
    switch (action.type) {
      case DAY_BLOCK_INPUT_CHECK:
        console.log("DAY_BLOCK_INPUT_CHECK");

        curDayBlock = draft.dayBlock.find(
          (day) => day.type === action.data.dayType
        );
        curDay = curDayBlock.blockData.find(
          (day) => day.seq === action.data.seq
        );
        curDay.content = action.data.content;
        curDay.isFinished = true;
        // return state
        break;
      case DAY_BLOCK_UNCHECK:
        console.log("DAY_BLOCK_UNCHECK");
        curDayBlock = draft.dayBlock.find(
          (day) => day.type === action.data.dayType
        );
        curDay = curDayBlock.blockData.find(
          (day) => day.seq === action.data.seq
        );
        curDay.isFinished = false;
        // return state;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
