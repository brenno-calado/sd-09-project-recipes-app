import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const contextValue = {
    setSearchResult,
    searchResult,
    isSearch,
    setIsSearch,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = { children: node }.isRequired;

export { Context, Provider };
