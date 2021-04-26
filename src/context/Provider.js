import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

const Provider = ({ children }) => {
  const [user, setUser] = useState({});

  const addUser = (userData) => {
    setUser(userData);
  };
  console.log(user);

  const context = {
    addUser,
    user,
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
