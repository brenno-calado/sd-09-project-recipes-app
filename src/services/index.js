const fetchMealCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
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

const getIngredientsImg = (ingredientName) => {
  const imgUrl = `https://www.themealdb.com/images/ingredients/${ingredientName}.png`;
  return imgUrl;
};

const fetchDrinkCategories = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const drinksCategories = await response.json();
  return drinksCategories.drinks;
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

const fetchApi = {
  fetchMealCategories,
  fetchMealByArea,
  fetchMealByIngredients,
  getIngredientsImg,
  fetchDrinkCategories,
  fetchDrinkByIngredients,
  fetchMealByFilter,
  fetchDrinkByFilter,
  fetchMeals,
  fetchDrinks,
};

export default fetchApi;
