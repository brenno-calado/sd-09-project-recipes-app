import React, { createContext, useEffect, useState } from 'react';
import { node } from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {}, []);

  const contextValue = {
    setSearchResult,
    searchResult,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = { children: node }.isRequired;

export { Context, Provider };
