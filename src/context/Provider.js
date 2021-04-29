import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const Provider = ({ children }) => {
  const [displaySearchBar, changeStatus] = useState({ status: false });

  const statusSearchBar = () => {
    const { status } = displaySearchBar;
    changeStatus({
      status: !status,
    });
  };

  const searchBarInit = {
    text: '',
    radio: 'ingredient',
  };

  const [searchBar, setSearchBar] = useState(searchBarInit);

  const addSearchBar = (text, radio) => {
    setSearchBar({
      text,
      radio,
    });
  };

  const context = {
    displaySearchBar,
    statusSearchBar,
    searchBar,
    addSearchBar,
  };

  return (
    <RecipesContext.Provider
      value={ context }
    >
      { children }
    </RecipesContext.Provider>

  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
