import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [title, setTitle] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const getTitleValue = () => {
    setTitle(title);
  };

  const contextValue = {
    title,
    setTitle,
    showSearchBar,
    setShowSearchBar,
    getTitleValue,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
