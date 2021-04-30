const mealsURL = 'https://www.themealdb.com/api/json/v1/1/';
const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const fetchApi = (endpoint) => (
  fetch(endpoint).then((result) => result.json().then((data) => data))
);

export const fecthByArea = async (name, isMeal) => {
  const url = isMeal ? mealsURL : drinksURL;
  const data = await fetchApi(`${url}filter.php?a=${name}`);
  return data;
};

export const fecthByCategory = async (name, isMeal) => {
  const url = isMeal ? mealsURL : drinksURL;
  const data = await fetchApi(`${url}filter.php?c=${name}`);
  return data;
};

export const fetchByFirstLetter = async (firstLetter, isMeal) => {
  const url = isMeal ? mealsURL : drinksURL;
  const data = await fetchApi(`${url}search.php?f=${firstLetter}`);
  return data;
};

export const fetchByIngredient = async (ingredient, isMeal) => {
  const url = isMeal ? mealsURL : drinksURL;
  const data = await fetchApi(`${url}filter.php?i=${ingredient}`);
  return data;
};

export const fecthByName = async (name, isMeal) => {
  const url = isMeal ? mealsURL : drinksURL;
  const data = await fetchApi(`${url}search.php?s=${name}`);
  return data;
};

export const fetchAreaList = async (isMeal) => {
  const url = isMeal ? mealsURL : drinksURL;
  const data = await fetchApi(`${url}list.php?a=list`);
  return data;
};

export const fetchCategoryList = async (isMeal) => {
  const url = isMeal ? mealsURL : drinksURL;
  const data = await fetchApi(`${url}list.php?c=list`);
  return data;
};

export const fetchIngredientList = async (isMeal) => {
  const url = isMeal ? mealsURL : drinksURL;
  const data = await fetchApi(`${url}list.php?i=list`);
  return data;
};

export const fetchRandomRecipe = async (isMeal) => {
  const url = isMeal ? mealsURL : drinksURL;
  const data = await fetchApi(`${url}random.php`);
  return data;
};

export const fetchRecipeDetails = async (id, isMeal) => {
  const url = isMeal ? mealsURL : drinksURL;
  const data = await fetchApi(`${url}lookup.php?i=${id}`);
  return isMeal ? data.meals[0] : data.drinks[0];
};
