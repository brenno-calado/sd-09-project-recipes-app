import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipiesContext = createContext();

function RecipiesProvider({ children }) {
  const [searchMealsList, setSearchMealsList] = useState([]);
  const [searchDrinksList, setSearchDrinksList] = useState([]);

  const context = {
    searchMealsList,
    setSearchMealsList,
    searchDrinksList,
    setSearchDrinksList,
  };

  return (
    <RecipiesContext.Provider value={ context }>
      {children}
    </RecipiesContext.Provider>
  );
}

RecipiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipiesProvider;
