import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

const { Provider } = RecipesAppContext;

function RecipesAppProvider({ children }) {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchButtonClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const contextValue = {
    showSearchBar,
    handleSearchButtonClick,
  };

  return (
    <Provider value={ contextValue }>
      { children }
    </Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesAppProvider;
