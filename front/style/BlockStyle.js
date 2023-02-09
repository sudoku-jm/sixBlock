import styled from "styled-components";

export const DayBlockContainerEl = styled.div`
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
    props.isblockCheck ? "rgba(0, 0, 0, 0.24) 0px 3px 8px;" : "none"};
  input[type="text"] {
    border-bottom: ${(props) =>
      props.isblockCheck ? "none" : "1px solid var(--color-c2c2c5);" };
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
