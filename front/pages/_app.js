import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";
const sixBlock = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>sixBlock</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
        />
      </Head>
      <Component />
    </>
  );
};

sixBlock.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(sixBlock);
