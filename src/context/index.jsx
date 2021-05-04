import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { setInitialLocalStorage } from '../services/localStorage';

const context = createContext();
const storage = setInitialLocalStorage();

function Provider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [authLogin, setAuthLogin] = useState({});
  const [formValidation, setFormValidation] = useState(false);
  const [foods, setFoods] = useState(null);
  const [drinks, setDrinks] = useState(null);
  const [categories, setCategories] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [toggleButton, setToggleButton] = useState(null);
  const [supriseId, setSurpriseId] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState(storage);

  const value = {
    data,
    setData,
    drinks,
    setDrinks,
    favoriteRecipes,
    setFavoriteRecipes,
    isSearching,
    setIsSearching,
    isLoading,
    setLoading,
    authLogin,
    setAuthLogin,
    formValidation,
    setFormValidation,
    foods,
    setFoods,
    categories,
    setCategories,
    supriseId,
    setSurpriseId,
    toggleButton,
    setToggleButton,
  };

  return (
    <context.Provider value={ value }>
      { children }
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  context,
  Provider,
};
