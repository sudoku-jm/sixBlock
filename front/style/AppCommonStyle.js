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
  }
`;
const PageTitle = styled.h2`
  & {
    margin: 0 0 4rem 0;
    font-size: 2.4rem;
    font-weight: 300;
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

export { MenuStyle, Nav, Logo, PageTitle };
