import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const updateData = async (api) => setData(await api);

  const contextValue = { data, updateData, isSearch, setIsSearch };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = { children: node }.isRequired;

export { Context, Provider };
