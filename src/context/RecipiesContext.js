import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipiesContext = createContext();

function RecipiesProvider({ children }) {
  const [searchMealsList, setSearchMealsList] = useState([]);
  const [searchDrinksList, setSearchDrinksList] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(true);

  const context = {
    searchMealsList,
    setSearchMealsList,
    searchDrinksList,
    setSearchDrinksList,
    showSearchBar,
    setShowSearchBar,
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
