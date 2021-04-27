import React, { createContext, useEffect } from 'react';
import { node } from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
  useEffect(() => {}, []);

  const contextValue = {};

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = { children: node }.isRequired;

export { Context, Provider };
