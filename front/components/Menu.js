import Link from "next/link";
import PropTypes from "prop-types";
import { Logo, MenuStyle, Nav } from "../style/AppCommonStyle";
import { TiUserOutline, TiHomeOutline } from "react-icons/ti";
import { useMemo } from "react";
const Menu = ({ page }) => {
  const styleIconMypage = useMemo(
    () => ({ fontSize: "2.8rem", color: "var(--color-black333)" }),
    []
  );
  return (
    <MenuStyle>
      <Logo>
        <Link href="/">
          <a title="식스블럭">SIXBLOCK</a>
        </Link>
      </Logo>
      <Nav>
        <Link href="/mypage">
          <a title="페이지이동">
            <TiHomeOutline style={styleIconMypage} />
            <TiUserOutline style={styleIconMypage} />
          </a>
        </Link>
      </Nav>
    </MenuStyle>
  );
};

Menu.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Menu;
