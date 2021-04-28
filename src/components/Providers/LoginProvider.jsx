import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { LoginContext } from '../../context';

export default function LoginProvider({ children }) {
  const [mealsToken, setMealsToken] = useState('');
  const [cocktailsToken, setCocktailsToken] = useState('');
  const [user, setUser] = useState({ email: '' });

  const value = {
    values: {
      mealsToken,
      cocktailsToken,
      user,
    },
    actions: {
      submitLogin(email) {
        setMealsToken(1);
        setCocktailsToken(1);
        setUser({ email });
      },
    },
  };

  useEffect(() => {
    Object.keys(value.values).forEach((key) => (
      localStorage.setItem(key, JSON.stringify(value.values[key]))
    ));
  }, [user]);

  return (
    <LoginContext.Provider value={ value }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: shape,
}.isRequired;
