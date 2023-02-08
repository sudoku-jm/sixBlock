import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';
const sixBlock = ( {Component} ) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>sixBlock</title>
            </Head>
            <Component/>
        </>
    )
}

sixBlock.propTypes = {
    Component : PropTypes.elementType.isRequired
}

export default wrapper.withRedux(sixBlock);