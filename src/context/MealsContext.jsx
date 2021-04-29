import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

const MealsContext = createContext();

export default MealsContext;

export function MealsProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('');
  const handleSearchInput = ({ target }) => setSearchInput(target.value);
  const handleSearchType = ({ target }) => setSearchType(target.value);

  const [meals, setMeals] = useState([]);

  const provide = {
    values: {
      searchInput,
      searchType,
      meals,
    },
    functions: {
      handleSearchInput,
      handleSearchType,
      setMeals,
    },
  };

  return (
    <MealsContext.Provider value={ provide }>
      { children }
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: node,
}.isRequired;
