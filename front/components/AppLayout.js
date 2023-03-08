import React from "react";
import PropTypes from "prop-types";
import { GlobalStyle, ContainerStyle } from "../style/GlobalStyle";

const AppLayout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ContainerStyle>
        {children}
      </ContainerStyle>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
