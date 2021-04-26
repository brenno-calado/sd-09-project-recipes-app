import React, { useState } from 'react';
import { node } from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [login, setLogin] = useState('login');

  const contextValue = {
    login,
    setLogin,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
