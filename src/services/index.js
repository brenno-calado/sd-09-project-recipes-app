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

const fetchMealFilter = async (url) => {
  const response = await fetch(url);
  const mealFilter = await response.json();
  return mealFilter.meals;
};

// const fetchMealByName = async (name) => {
//   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
//   const mealName = await response.json();
//   return mealName.meals;//.filter((eachMeal) => eachMeal.strMeal.toLowerCase().includes(name.toLowerCase()));
// };

// const fetchMealByFirstLetter = async (firstLetter) => {
//   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
//   const mealFirstLetter = await response.json();
//   return mealFirstLetter.meals;
// };

// const fetchMealByIngredient = async (ingredient) => {
//   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
//   const mealIngredients = await response.json();
//   return mealIngredients.meals;
// };

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

const fetchApi = {
  fetchMealCategories,
  fetchMealByArea,
  fetchMealByIngredients,
  getIngredientsImg,
  fetchDrinkCategories,
  fetchDrinkByIngredients,
  fetchMealFilter,
};

export default fetchApi;
