import styled from "styled-components";

export const DayBlockContainerEl = styled.div`
  h3 {
    font-size: 20px;
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
  position: relative;
  width: 49%;
  padding: 20px;
  border: 2px solid var(--color-primary);
  border-radius: 15px;
  background-color: ${(props) =>
    props.isblockCheck ? "var(--color-f0f0f0)" : "transparent"};
  box-shadow: ${(props) =>
    props.isblockCheck
      ? "rgba(0, 0, 0, 0.24) 0px 3px 8px;"
      : "transparent"};
`;

export const CheckboxEl = styled.div`
  position: absolute;
  top: -13px;
  left: -10px;
  display: inline-block;
  margin-right: 5px;
  label {
    line-height: 1.5;
  }
  span {
    vertical-align: middle;
  }
  input[type="checkbox"] {
    display: inline-block;
    vertical-align: middle;
    appearance: none;
    border: max(2px, 0.2em) solid var(--color-secondary);
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    transition: all 0.2s ease-in-out;
    margin-right: 3px;
    background-color: var(--color-white);
    &:checked {
      border: 0.2em solid var(--color-primary);
      position: relative;
      &::after {
        position: absolute;
        content: "✔"; 
        /* 💜 */
        display: inline-block;
        top: -2px;
        left: 3px;
        font-weight: 700;
        font-size: 24px;
        color: var(--color-primary);
      }
    }
    /* &:focus-visible {
      outline-offset: max(2px, 0.1em);
      outline: max(2px, 0.1em) dotted var(--color-primary);
    } */
    &:hover {
      box-shadow: 0 0 0 max(2px, 0.3em) var(--color-greyeee);
    }
    &:disabled {
      background-color: var(--color-greyeee);
      box-shadow: none;
      opacity: 0.7;
      cursor: not-allowed;
      & + span {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }
  }
`;

export const InputEl = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid var(--color-c2c2c5);
  padding: 5px;
  cursor: text;
  &:disabled {
    cursor: default;
  }
`;
