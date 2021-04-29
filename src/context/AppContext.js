import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFoods, getDrinks, getFoodCategories, getDrinkCategories } from '../services';

export const AppContext = createContext();

const NUMBER_OF_ITEMS = 12;
const NUMBER_OF_CATEGORIES = 5;

const AppProvider = ({ children }) => {
  const [foodApiResults, setFoodApiResults] = useState([]);
  const [drinksApiResults, setDrinksApiResults] = useState([]);
  const [foodsArray, setFoodsArray] = useState([]);
  const [drinksArray, setDrinksArray] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favoritesId')) || {},
  );
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')) || [],
  );

  // const inProgressRecipesObject = {
  //   cocktails: {},
  //   meals: {},
  // };
  // const [inProgressRecipes, setInProgressRecipes] = useState(inProgressRecipesObject);

  // const setLocalStorageInProgress = (type, id, ingredientsArray) => {
  //   if (type === 'Meal') {
  //     setInProgressRecipes({ ...inProgressRecipes, meals: { [id]: ingredientsArray } });
  //   }
  //   if (type === 'Drink') {
  //     setInProgressRecipes({ ...inProgressRecipes,
  //       cocktails: { [id]: ingredientsArray } });
  //   }
  // };

  const fetchFoods = async () => {
    const response = await getFoods();
    setFoodsArray(response.slice(0, NUMBER_OF_ITEMS));
  };

  const fetchDrinks = async () => {
    const response = await getDrinks();
    setDrinksArray(response.slice(0, NUMBER_OF_ITEMS));
  };

  const fetchFoodCategories = async () => {
    const response = await getFoodCategories();
    setFoodCategories(response.slice(0, NUMBER_OF_CATEGORIES));
  };

  const fetchDrinkCategories = async () => {
    const response = await getDrinkCategories();
    setDrinkCategories(response.slice(0, NUMBER_OF_CATEGORIES));
  };

  const addToFavorites = (id) => {
    setFavorites({
      ...favorites,
      [id]: true,
    });
  };

  const removeFromTheFavorites = (id) => {
    setFavorites({
      ...favorites,
      [id]: false,
    });
  };

  const favoriteRecipe = (meal) => {
    setFavoriteRecipes([
      ...favoriteRecipes,
      meal,
    ]);
  };

  const removeFromFavorite = (id) => {
    setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== id));
  };

  const finishRecipe = (recipe) => {
    setDoneRecipes([...doneRecipes, recipe]);
  };

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }, [doneRecipes]);

  useEffect(() => {
    localStorage.setItem('favoritesId', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  useEffect(() => {
    fetchFoods();
    fetchDrinks();
    fetchFoodCategories();
    fetchDrinkCategories();
  }, []);

  const foods = foodApiResults.length && foodApiResults !== 'null'
    ? foodApiResults : foodsArray;
  const drinks = drinksApiResults.length && drinksApiResults !== 'null'
    ? drinksApiResults : drinksArray;

  const context = {
    foods,
    drinks,
    foodCategories,
    drinkCategories,
    favoriteRecipes,
    favorites,
    setFoodApiResults,
    setDrinksApiResults,
    favoriteRecipe,
    removeFromFavorite,
    addToFavorites,
    removeFromTheFavorites,
    finishRecipe,
  };
  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
