import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getFoods,
  getDrinks,
  getFoodCategories,
  getDrinkCategories, getMealAreas, getMealIngredients, getDrinkIngredients,
} from '../services';

export const AppContext = createContext();

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
  const [mealAreas, setMealAreas] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')) || [],
  );
  // const [xablau, setXablau] = useState('');

  const [inProgressRecipes, setInProgressRecipes] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || {},
  );
  const [mealIngredients, setMealIngredients] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [ingredientsUsed, setIngredientsUsed] = useState([]);

  // teste

  const [inProgressDrinks, setInProgressDrinks] = useState(
    JSON.parse(localStorage.getItem('inProgressDrinks')) || {},
  );
  const [inProgressMeals, setInProgressMeals] = useState(
    JSON.parse(localStorage.getItem('inProgressMeals')) || {},
  );

  const handleProgressDrink = (recipe, id) => {
    setInProgressDrinks({
      ...inProgressDrinks,
      [id]: recipe,
    });
  };
  const handleProgressMeal = (recipe, id) => {
    setInProgressMeals({
      ...inProgressMeals,
      [id]: recipe,
    });
  };

  useEffect(() => {
    localStorage.setItem('inProgressDrinks', JSON.stringify(inProgressDrinks));
  }, [inProgressDrinks]);

  useEffect(() => {
    localStorage.setItem('inProgressMeals', JSON.stringify(inProgressMeals));
  }, [inProgressMeals]);

  // fim do teste
  const handleProgressRecipes = (type, id) => {
    setInProgressRecipes({
      ...inProgressRecipes,
      [type]: { [id]: ingredientsUsed },
    });
  };

  const handleIngredientsUsed = (ingredient) => {
    setIngredientsUsed([
      ...ingredientsUsed,
      ingredient,
    ]);
  };

  const fetchFoods = async () => {
    const response = await getFoods();
    setFoodsArray(response);
  };

  const fetchDrinks = async () => {
    const response = await getDrinks();
    setDrinksArray(response);
  };

  const fetchFoodCategories = async () => {
    const response = await getFoodCategories();
    setFoodCategories(response);
  };

  const fetchDrinkCategories = async () => {
    const response = await getDrinkCategories();
    setDrinkCategories(response);
  };

  const fetchMealAreas = async () => {
    const response = await getMealAreas();
    setMealAreas(response);
  };

  const fetchMealIngredients = async () => {
    const response = await getMealIngredients();
    setMealIngredients(response);
  };

  const fetchDrinkIngredients = async () => {
    const response = await getDrinkIngredients();
    setDrinkIngredients(response);
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
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    // setXablau(Math.random());
  }, [favoriteRecipes]);

  useEffect(() => {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  }, [inProgressRecipes]);

  useEffect(() => {
    fetchFoods();
    fetchDrinks();
    fetchFoodCategories();
    fetchDrinkCategories();
    fetchMealAreas();
    fetchMealIngredients();
    fetchDrinkIngredients();
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
    mealAreas,
    mealIngredients,
    drinkIngredients,
    doneRecipes,
    inProgressRecipes,
    // xablau,
    setFoodApiResults,
    setDrinksApiResults,
    favoriteRecipe,
    removeFromFavorite,
    finishRecipe,
    handleProgressRecipes,
    handleIngredientsUsed,
    handleProgressMeal,
    handleProgressDrink,
    inProgressDrinks,
    inProgressMeals,
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
