import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getFoods, getDrinks, getFoodCategories, getDrinkCategories, getMealAreas,
} from '../services';

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
  const [mealAreas, setMealAreas] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')) || [],
  );
  const [xablau, setXablau] = useState('');

  const [inProgressDrinks, setInProgressDrinks] = useState(
    JSON.parse(localStorage.getItem('inProgressDrinks')) || {},
  );
  const [inProgressMeals, setInProgressMeals] = useState(
    JSON.parse(localStorage.getItem('inProgressMeals')) || {},
  );

  const inProgressDrink = (recipe, id) => {
    setInProgressDrinks({
      ...inProgressDrinks,
      [id]: recipe,
    });
  };
  const inProgressMeal = (recipe, id) => {
    setInProgressMeals({
      ...inProgressMeals,
      [id]: recipe,
    });
  };

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

  const fetchMealAreas = async () => {
    const response = await getMealAreas();
    setMealAreas(response);
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
    setXablau(Math.random());
  }, [favoriteRecipes]);

  useEffect(() => {
    localStorage.setItem('inProgressDrinks', JSON.stringify(inProgressDrinks));
  }, [inProgressDrinks]);

  useEffect(() => {
    localStorage.setItem('inProgressMeals', JSON.stringify(inProgressMeals));
  }, [inProgressMeals]);

  useEffect(() => {
    fetchFoods();
    fetchDrinks();
    fetchFoodCategories();
    fetchDrinkCategories();
    fetchMealAreas();
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
    mealAreas,
    setFoodApiResults,
    setDrinksApiResults,
    favoriteRecipe,
    removeFromFavorite,
    addToFavorites,
    removeFromTheFavorites,
    finishRecipe,
    xablau,
    inProgressDrink,
    inProgressMeal,
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
