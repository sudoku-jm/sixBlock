import styled from "styled-components";
import { PageTitle } from "./AppCommonStyle";

export const DayBlockContainerEl = styled.div`
  position: relative;
  z-index: 0;
  h3 {
    font-size: 17px;
    margin: 10px 0 15px;
  }
  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0 20px;
  }
`;

export const DayBlockEl = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin:10px 0;
  width: calc(50% - 10px);
  padding: 30px 20px;
  border-radius: 15px;
  background-color: ${(props) =>
    props.isblockCheck ? "var(--color-f0f0f0)" : "var(--color-primary-op2)"};
  box-shadow: ${(props) =>
    props.isblockCheck ? "rgba(0, 0, 0, 0.2) 0px 3px 8px;" : "none"};
  input[type="text"] {
    border-bottom: ${(props) =>
      props.isblockCheck ? "none" : "1px solid var(--color-c2c2c5);"};
  }
`;

export const CheckboxEl = styled.div`
  position: absolute;
  top:50%;
  right:20px;
  transform:translateY(-50%);
  width:30px;
  height:30px;
  label {
    line-height: 1.7;
    position: relative;
    display: block;
    &::before {
      content: "";
      position: absolute;
      border: 4px dashed var(--color-c2c2c5);
      width:25px;
      height:25px;
      border-radius: 50%;
    }
    &::after {
      content: "";
    }
    .check_icon {
      content: "";
      position: absolute;
      top:3px;
      left:50%;
      transform: translateX(-50%);
      font-size: 25px;
      color: var(--color-c2c2c5);
    }
    span {
      font-size: 20px;
    }
  }
  input[type="checkbox"] {
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
    left:-9999px;
  }
  input[type="checkbox"]:checked + label {
    &::before {
      background-color: var(--color-primary);
      border: 4px solid var(--color-primary);
    }
    .check_icon {
      color: var(--color-white);
    }
  }
`;

export const InputEl = styled.input`
  width: 80%;
  outline: none;
  border: none;
  border-bottom: 1px solid var(--color-c2c2c5);
  padding: 5px;
  cursor: text;
  font-size: 18px;
  &:disabled {
    cursor: default;
  }
`;

export const SelectTitleEl = styled.div`
  position: relative;
  margin: 0 0 4rem 0;
  select {
    font-size: 2.4rem;
    font-weight: 300;
    border: none;
    outline: none;
  }
  .title_icon {
    position: absolute;
    top: 20%;
    right: 0;
    font-size: 2.4rem;
  }
`;

export const SelectBoxEl = styled.div`
  position: relative;
  width: ${(props) => (props.type === "inline" ? "80px" : "100%")};
  text-align: center;
  padding: 8px 20px 8px 8px;
  border-radius: 12px;
  background-color: var(--color-white);
  align-self: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &.disabled {
    background-color: var(--color-dimmed);
    cursor: auto;
  }

  label {
    font-size: 14px;
    text-align: center;
  }
  .ico_select {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    font-size: x-large;
  }
  ul {
    position: absolute;
    z-index: 4;
    list-style: none;
    top: 45px;
    left: 0;
    width: 100%;
    overflow: hidden;
    /* height: 90px; */
    max-height: ${(props) => (props.show ? "none" : "0")};
    padding: 0;
    border-radius: 8px;
    background-color: var(--color-white);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    li {
      font-size: 14px;
      padding: 6px 8px;
      transition: background-color 0.2s ease-in;
      border-bottom: 2px solid var(--color-white);
      &:last-child {
        border-bottom: none;
      }
      &:hover,
      &.selected_value {
        background-color: var(--color-primary-op4);
      }
    }
  }
`;

//datepicker custom
export const DatePickerContEl = styled.div`
  position: absolute;
  content: "";
  top: 50%;
  right: 5%;
  transform: translateY(-40%);
  svg {
    font-size: 2.5rem;
  }
  .react-datepicker-popper {
    z-index: 99;
    inset: 10px 0px auto auto !important;
  }
  .react-datepicker-popper[data-placement^="bottom"] {
    margin-top: 0;
  }
  .react-datepicker {
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 500;
    border: 1px solid var(--color-secondary);
    /* font-size: 1.8rem; */
    font-size: 1em;
  }
  .react-datepicker__triangle::before {
    display: none;
  }
  .react-datepicker__triangle {
    left: auto !important;
    right: 0 !important;
    transform: none !important;
    border-bottom-color: var(--color-secondary) !important;
  }
  .react-datepicker__header {
    padding-top: 0.8em;
    background-color: var(--color-secondary);
    color: var(--color-white);
    .react-datepicker__day-name,
    .react-datepicker__current-month {
      color: var(--color-white);
    }
  }
  .react-datepicker__navigation {
    top: 1em;
    line-height: 1.7em;
    border: 0.45em solid transparent;
  }
  .react-datepicker__navigation--next {
    border-left-color: var(--color-white);
    right: 1em;
  }
  .react-datepicker__navigation--previous {
    border-right-color: var(--color-white);
    left: 1em;
  }
  .react-datepicker__month {
    margin: 0.4em 1em;
    background-color: var(--color-white);
  }
  .react-datepicker__day--keyboard-selected {
    background-color: var(--color-primary);
  }
  .react-datepicker__aria-live {
    display: none;
  }
  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 1.9em;
    line-height: 1.9em;
    margin: 0.166em;
  }
  .react-datepicker__current-month {
    font-size: 1em;
  }
`;

export const DimmedBG = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-dimmed);
  left: 0;
  z-index: 2;
`;
//react-calendar custom
export const CalendarContEl = styled.div`
  .react-calendar {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    z-index: 9999;
    padding: 15px 20px;
    border: none;
    border-radius: 15px;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 500;
    z-index: 3;
    .react-calendar,
    .react-calendar *,
    .react-calendar *:before,
    .react-calendar *:after {
      text-decoration: none;
      font-size: 15px;
    }
    .react-calendar__month-view__weekdays__weekday {
      text-decoration: none;
    }
    .react-calendar__tile--active {
      background: var(--color-primary);
    }
    .react-calendar__tile--now {
      background: var(--color-f0f0f0);
    }
    .react-calendar__tile {
      position: relative;
    }
    .react-calendar__navigation {
      margin-bottom: 25px;
    }
    .react-calendar__navigation__label__labelText {
      font-size: 20px;
    }
    .react-calendar__navigation button {
      font-size: 25px;
    }
    .dot_container {
      position: absolute;
      content: "";
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
      .dot {
        width: 5px;
        height: 5px;
        background: var(--color-red);
        border-radius: 50%;
      }
      &.block_container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        .block {
          width: 10px;
          height: 5px;
          &:not(.active) {
            opacity: 0;
          }
          margin: 1px;
          &:nth-child(1),
          &:nth-child(2) {
            background-color: var(--color-point01);
          }
          &:nth-child(3),
          &:nth-child(4) {
            background-color: var(--color-point02);
          }
          &:nth-child(5),
          &:nth-child(6) {
            background-color: var(--color-point03);
          }
        }
      }
    }
  }
`;

export const WeekBlockContainerEl = styled.div`
  h3 {
    font-size: 17px;
    margin: 10px 0 15px;
  }
  .week_title {
    ul {
      display: flex;
      margin-left: 50px;
      li {
        width: calc(100% / 3);
        padding: 10px 0;
        text-align: center;
        font-size: 1.7rem;
        font-weight: 700;
      }
    }
  }
  .week_content {
    .week_content_each {
      display: flex;
      height: 60px;
      margin-bottom: 7px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    h3 {
      width: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      em{
        font-size:1rem;
      }
    }
    ul {
      width: calc(100% - 70px);
      display: flex;
      justify-content: space-between;

      li {
        width: calc(100% / 6 - 5px);
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background-color: var(--color-primary-op2);
        cursor: pointer;
        span {
          &.dimmed_text {
            color: var(--color-c2c2c5);
          }
          &.active_text {
            /* color: var(--color-white); */
            font-weight: 700;
          }
        }
        &.finished_block {
          background-color: var(--color-f0f0f0);
          box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 3px;
          cursor: pointer;
          .finished_icon {
            position: absolute;
            content: "";
            /* font-size: 20px; */
            width: 28px;
            height: 28px;
            border-radius: 50%;
            color: var(--color-white);
            background-color: var(--color-primary);
          }
          span {
            color: var(--color-c2c2c5);
          }
        }
      }
    }
  }
`;

export const KeywordModalEl = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  background-color: var(--color-white);
  border-radius: 20px;
  text-align: center;
  z-index: 3;
  .modal_inner {
    position: relative;
    .modal_close {
      display: flex;
      justify-content: flex-end;
      padding: 15px;
      font-size: 2rem;
    }
    .modal_title {
      text-align: center;
      font-size: 2rem;
      padding-bottom: 10px;
      border-bottom: 3px solid var(--color-primary);
    }
    .modal_content {
      padding: 15px 20px;
      font-size: 1.6rem;
      .modal_content_each {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        min-height: 65px;
        &:last-child {
          margin-bottom: 0;
        }
        h5 {
          width: 20%;
        }
        & > div {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        input[type="text"] {
          text-align: center;
        }
      }
    }
    .modal_btm {
      margin: 10px 0;
      button {
        margin-right: 5px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;

export const MonthBlockContEl = styled.div`
  .react-calendar {
    width: 100%;
    border: none;
    z-index: 1;
    .react-calendar__tile {
      padding: 10px 10px 35px;
      margin: 7px 0;
    }
  }
`;

export const KeywordSelectModalEl = styled.div`
  position: absolute;
  top: 35px;
  left: 50%;
  width: 80%;
  transform: translateX(-50%);
  background-color: var(--color-white);
  z-index: 5;
  box-shadow: var(--basic-box-shadow);
  border-radius: 10px;
  max-height: calc(100vh / 2);
  overflow-y: auto;
  ul {
    li {
      padding: 10px;
      &:hover {
        background-color: var(--color-primary-op2);
      }
    }
    &.input_keyword {
      li {
        background-color: var(--color-point01);
      }
    }
  }
`;