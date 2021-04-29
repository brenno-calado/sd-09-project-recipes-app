import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

const DrinksContext = createContext();

export default DrinksContext;

export function DrinksProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const handleSearchInput = ({ target }) => setSearchInput(target.value);
  const handleSearchType = ({ target }) => setSearchType(target.value);

  const [drinks, setDrinks] = useState([]);

  const provide = {
    values: {
      searchInput,
      searchType,
      drinks,
    },
    functions: {
      handleSearchInput,
      handleSearchType,
      setDrinks,
    },
  };

  return (
    <DrinksContext.Provider value={ provide }>
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: node,
}.isRequired;
