import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => (
  <AppContext.Provider value={ {} }>
    { children }
  </AppContext.Provider>
);

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
