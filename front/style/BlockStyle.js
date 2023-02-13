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
    justify-content: space-between;
    align-items: center;
    margin: 5px 0 20px;
  }
`;

export const DayBlockEl = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 48.5%;
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
  label {
    position: relative;
    padding-right: 40px;
    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0;
      border: 4px dashed var(--color-c2c2c5);
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    &::after {
      content: "";
      position: absolute;
    }
    .check_icon {
      content: "";
      position: absolute;
      top: 3px;
      left: 4px;
      font-size: 30px;
      color: var(--color-c2c2c5);
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
  svg {
    position: absolute;
    top: 20%;
    right: 0;
    font-size: 2.4rem;
  }
`;

export const SelectBoxEl = styled.div`
  position: relative;
  width: 80px;
  text-align: center;
  padding: 8px 20px 8px 8px;
  border-radius: 12px;
  background-color: #ffffff;
  align-self: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  label {
    font-size: 14px;
    text-align: center;
  }
  ul {
    position: absolute;
    z-index: 2;
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
      &:hover {
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

    .react-calendar__month-view__weekdays__weekday {
      text-decoration: none;
    }
    .react-calendar__tile--active {
      background: var(--color-primary);
    }
    .react-calendar__tile--now {
      background: var(--color-c2c2c5);
    }
    .react-calendar__tile {
      position: relative;
    }
    .dot_container {
      position: absolute;
      content: "";
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      .dot {
        width: 5px;
        height: 5px;
        background: var(--color-red);
        border-radius: 50%;
      }
    }
  }
`;

export const WeekBlockContainerEl = styled.div`
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
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ul {
      width: calc(100% - 50px);
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
      padding: 15px;
      font-size: 1.6rem;
      .modal_content_each {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        min-height: 55px;
        &:last-child {
          margin-bottom: 0;
        }
        h5 {
          width: 20%;
        }
        & > div {
          width: 80%;
        }
      }
    }
  }
`;

export const MonthBlockContEl = styled.div`
  .react-calendar {
    width: 100%;
    border: none;
    .react-calendar__tile {
      padding: 15px 10px 30px;
    }
  }
`;
