const fetchMealCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const mealCategories = await response.json();
  return mealCategories.meals;
};

const fetchMealByCategories = async (category) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const mealCategories = await response.json();
  return mealCategories.meals;
};

const fetchMealByArea = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const mealArea = await response.json();
  return mealArea.meals;
};

const fetchMealByIngredients = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const mealIngredients = await response.json();
  return mealIngredients.meals;
};

const fetchMealByFilter = async (url) => {
  const response = await fetch(url);
  const mealFilter = await response.json();
  return mealFilter.meals;
};

const fetchDrinkByFilter = async (url) => {
  const response = await fetch(url);
  const drinkFilter = await response.json();
  return drinkFilter.drinks;
};

const getMealIngredientsImg = (ingredientName) => {
  const imgUrl = `https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png`;
  return imgUrl;
};

const getDrinkIngredientsImg = (ingredientName) => {
  const imgUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;
  return imgUrl;
};

const fetchDrinkCategories = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const drinksCategories = await response.json();
  return drinksCategories.drinks;
};

const fetchDrinkByCategories = async (category) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`,
  );
  const drinkCategories = await response.json();
  return drinkCategories.drinks;
};

const fetchDrinkByIngredients = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const drinksIngredients = await response.json();
  return drinksIngredients.drinks;
};

const fetchMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const mealsData = await response.json();
  return mealsData.meals;
};

const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const drinksData = await response.json();
  return drinksData.drinks;
};

const fetchRandomMealId = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const randomMeal = await response.json();
  return randomMeal.meals[0].idMeal;
};

const fetchRandomDrinkId = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const randomDrink = await response.json();
  return randomDrink.drinks[0].idDrink;
};

const fetchApi = {
  fetchMealCategories,
  fetchMealByCategories,
  fetchMealByArea,
  fetchMealByIngredients,
  getMealIngredientsImg,
  getDrinkIngredientsImg,
  fetchDrinkCategories,
  fetchDrinkByCategories,
  fetchDrinkByIngredients,
  fetchMealByFilter,
  fetchDrinkByFilter,
  fetchMeals,
  fetchDrinks,
  fetchRandomMealId,
  fetchRandomDrinkId,
};

export default fetchApi;
