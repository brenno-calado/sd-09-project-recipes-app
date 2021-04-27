import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [isLoading, setLoading] = useState(false);
  const [toggledSearchBar, setToggledSearchBar] = useState(false);

  const showSearchBar = () => setToggledSearchBar(!toggledSearchBar);

  const contextValues = {
    toggledSearchBar,
    showSearchBar,
    isLoading,
    setLoading,
  };
  const { Provider } = RecipesContext;

  return (
    <Provider value={ contextValues }>
      {children}
    </Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
