import styled from "styled-components";
const FormStyle = styled.section`
  & {
    position: relative;
    padding: 4rem 0 10rem 0;
  }
  .form-input {
    margin-bottom: 3rem;
    label {
      display: block;
      margin-bottom: 1rem;
      font-size: 1.6rem;
      font-weight: 500;
    }
    input,
    select {
      padding: 10px;
      border-bottom: 1px solid var(--color-greyeee);
      width: 100%;
      font-size: 1.4rem;
    }
    .essential {
      position: relative;
      &:after {
        content: "*";
        color: var(--color-red);
      }
    }
  }
  .form-chk {
    margin-top: 3rem;
    label {
      position: relative;
      padding-left: 25px;
      font-size: 1.4rem;

      span {
        vertical-align: middle;
      }
      &:before,
      &:after {
        transition: 0.2s;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 5px;
        width: 15px;
        height: 15px;
        border: 1px solid var(--color-f0f0f0);
      }
      &:after {
        content: "";
        position: absolute;
      }
    }
    input {
      height: 0;
      width: 0;
      font-size: 0;
      line-height: 0;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    input:checked + label {
      color: var(--color-primary);
      &:before {
        background: var(--color-primary);
        border-color: var(--color-primary);
      }
      &:after {
        top: 8px;
        left: 2px;
        width: 10px;
        height: 5px;
        border-top: 2px solid var(--color-white);
        border-right: 2px solid var(--color-white);
        transform: rotate(135deg);
      }
    }
  }
  .form-btn-account,
  .form-btn-login {
    margin-top: 6rem;
  }
  .form-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1rem;
    button,
    a {
      display: inline-block;

      text-align: center;
      color: var(--color-secondary);
    }
    &.col2 {
      flex-direction: row;
      a {
        position: relative;
        padding: 4px 10px;
        &:first-child {
          &:after {
            content: "";
            position: absolute;
            top: 5px;
            right: 0;
            width: 1px;
            height: 15px;
            background: var(--color-f0f0f0);
          }
        }
      }
    }
  }

  .form-row {
    display: flex;
    input {
      width: inherit;
    }
    &.form-id {
      input {
        width: calc(100% - 70px);
      }
    }
    &.form-email {
      em {
        padding: 0 4px;
        width: 2.5rem;
        line-height: 1.7;
        font-size: 1.7rem;
        vertical-align: bottom;
      }
      input,
      .select-box {
        width: calc(50% - 1.5rem);
      }
      select {
        padding: 10px;
        border: 0;
        border-bottom: 1px solid var(--color-greyeee);
      }
      .select-box {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          top: 12px;
          right: 0;
          width: 8px;
          height: 8px;
          border-top: 2px solid var(--color-secondary);
          border-right: 2px solid var(--color-secondary);
          transform: rotate(135deg);
        }
      }
    }
  }
`;

export default FormStyle;
