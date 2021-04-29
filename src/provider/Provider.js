import React, { useState } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../context/recipesContext';

function Provider({ children }) {
  const [data, setData] = useState('');
  const [recipes, setRecipes] = useState([]);

  const contextValue = {
    data,
    setData,
    recipes,
    setRecipes,
  };

  return (
    <recipesContext.Provider value={ contextValue }>
      {children}
    </recipesContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
