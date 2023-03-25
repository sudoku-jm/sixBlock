import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root{
    //theme
    --color-primary: #6042f8;
    --color-secondary : #8e909f; 
    --color-white: #fff;
    //primary opacity color
    --color-primary-op1 : rgba(96, 96, 248, 0.1);
    --color-primary-op2 : rgba(96, 96, 248, 0.2);
    --color-primary-op3 : rgba(96, 96, 248, 0.3);
    --color-primary-op4 : rgba(96, 96, 248, 0.4);
    --color-primary-op5 : rgba(96, 96, 248, 0.5);
    --color-primary-op6 : rgba(96, 96, 248, 0.6);
    --color-primary-op7 : rgba(96, 96, 248, 0.7);
    --color-primary-op8 : rgba(96, 96, 248, 0.8);
    --color-primary-op9 : rgba(96, 96, 248, 0.9);

    //default
    --color-red : #ff7c7c;
    --color-greyeee : #eee;
    --color-black333 : #333;
    
    --color-c2c2c5: #c2c2c5;  //placeholder
    --color-f0f0f0: #f0f0f0;  //after,disabled

    --color-dimmed : rgba(0,0,0, 0.1);

    //기타 블록용 색상
    --color-point01 : #F695AE;
    --color-point02 : #FEC94D;
    --color-point03 : #8F95F9;

    --basic-box-shadow : 0px 4px 4px rgb(0 0 0 / 20%);

  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  }
  html{
    font-size:62.5%; /*기본 브라우저 = 16px. 16px의 62.5%는 10px = 1rem.*/
  }
  body{
    font-family: 'Noto Sans KR', sans-serif;
    font-weight:500;
  }
  ul,
  li,
  ol {
    list-style: none;
  }
  img,
  fieldset {
    border: 0;
  }
  img {
    vertical-align: top;
  }
  a,
  a:link {
    text-decoration: none;
    color: #000;
  }
  input,
  select,
  textarea,
  button {
    font-family: 'Noto Sans KR', sans-serif;
    font-weight:500;
    vertical-align: middle;
    border-radius: 0;
    cursor: pointer;
    /*ios대응*/
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-border-radius: 0;
    background:none;
  }
  input::placeholder,
  select::placeholder,
  textarea::placeholder,
  button::placeholder{
    color:var(--color-c2c2c5);
  }
  input[type="text"],
  input[type="password"]{
    border:0;
  }
  
  input[type="text"]:focus,
  input[type="text"]:hover {
    outline: none;
  }
  input[type="checkbox"],
  input[type="radio"] {
    cursor: pointer;
  }
  input[type="button"] {
    border: none;
  }
  textarea:disabled {
    background: var(--color-f0f0f0);
    color: var(--color-black333);
  }
  i,
  em,
  address {
    font-style: normal;
  }
  table {
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
  }
  legend,
  caption {
    line-height: 0;
    width: 0;
    height: 0;
    overflow: hidden;
    font-size: 0;
  }
  button {
    border: 0;

    cursor: pointer;
  }
`;

const ContainerStyle = styled.section`
  & {
    margin: 0 auto;
    // width: 640px;
    width:414px;
  }
  /*body scroll*/
  .scroll-hidden {
    overflow: hidden;
  }
  .scroll-hidden-x {
    overflow-x: hidden;
  }
  .scroll-hidden-y {
    overflow-y: hidden;
  }

  /*말줄임 */
  .dotdot {
    display: inline-block;
    max-width: 95%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* 접근성 : 숨김 텍스트 */
  .hdtxt {
    height: 0;
    width: 0;
    font-size: 0;
    line-height: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .btnL {
    display: inline-block;
    padding: 1.4rem 2rem !important;
    font-size: 1.8rem !important;
    font-weight: 500 !important;
  }
  .btnM {
    display: inline-block;
    padding: 1.2rem 2rem !important;
    font-size: 1.4rem !important;
    font-weight: 500 !important;
  }
  .btnS {
    display: inline-block;
    padding: 0.6rem 1rem !important;
    font-size: 1.2rem !important;
    font-weight: 500 !important;
  }
  .btnRoundS {
    border-radius: 0.7rem !important;
  }
  .btnRound {
    border-radius: 1.4rem !important;
  }
  .btn-primary {
    background: var(--color-primary) !important;
    color: var(--color-white) !important;
  }
  .btn-grey {
    background: var(--color-greyeee) !important;
    color: var(--color-black333) !important;
  }
  .btn-unvisiblelity-bdr {
    border: 1px solid var(--color-primary) !important;
    color: var(--color-primary) !important;
  }

  button:disabled,
  input:read-only {
    background: var(--color-f0f0f0) !important;
    color: var(--color-c2c2c5) !important;
  }
`;

const contentAfter = () => {
  return `&:after {
      content: "";

    }`;
};

export { GlobalStyle, ContainerStyle, contentAfter };
