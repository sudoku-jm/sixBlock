import styled from "styled-components";
const MenuStyle = styled.div`
  & {
    position: relative;
    height: 6rem;
    /* border-bottom: 1px solid var(--color-greyeee); */
  }
`;
const Nav = styled.nav`
  & {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    a {
      display: block;
    }
  }
`;
const PageTitle = styled.h2`
  & {
    margin: 0 0 4rem 0;
    font-size: 2.4rem;
    font-weight: 300;
  }
`;
const PageTitle2 = styled.h3`
  & {
    margin: 0 0 1rem 0;
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

const Logo = styled.h1`
  & {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-size: 2rem;
  }
`;

const ErrorMsg = styled.div`
  color: var(--color-red);
  font-size: 1.3rem;
`;

const DoneMsg = styled.div`
  color: var(--color-primary);
  font-size: 1.3rem;
`;

const ModalStyle = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export {
  MenuStyle,
  Nav,
  Logo,
  PageTitle,
  PageTitle2,
  ErrorMsg,
  DoneMsg,
  ModalStyle,
};
