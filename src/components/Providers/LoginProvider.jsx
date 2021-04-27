import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { values } from 'lodash';
import { LoginContext } from '../../context';

export default function LoginProvider({ children }) {
  const [mealsToken, setMealstoken] = useState('');
  const [cocktailsToken, setCocktailsToken] = useState('');
  const [email, setEmail] = useState('');

  const value = {
    values: {
      mealsToken,
      cocktailsToken,
      email,
    },
    actions: {
      submitLogin(userEmail) {
        setMealstoken(1);
        setCocktailsToken(1);
        setEmail(userEmail);
      },
    },
  };

  useEffect(() => {
    Object.keys(values.value).forEach((key) => (
      localStorage.setItem(key, values.value[key])
    ));
  }, [email]);

  return (
    <LoginContext.Provider value={ value }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: shape,
}.isRequired;
