import React from 'react';
import PropTypes from 'prop-types';
import GlobalStyles from '../../styles/GlobalStyles';

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
