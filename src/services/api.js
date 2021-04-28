export const fetchForIngredients = async (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(url);
  const listOfIngredients = await response.json();
  return listOfIngredients;
};

export const fecthForName = async (name, isMeal) => {
  const mealsURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const drinksURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const url = isMeal ? mealsURL : drinksURL;
  const response = await fetch(url);
  const listOfName = await response.json();
  return listOfName;
};

export const fetchForFirstLetter = async (firstLetter) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(url);
  const listOfName = await response.json();
  return listOfName;
};

export const fecthByCategory = async (name, isMeal) => {
  const mealsURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
  const drinksURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
  const url = isMeal ? mealsURL : drinksURL;
  const response = await fetch(url);
  const listOfName = await response.json();
  return listOfName;
};

export const fetchCategories = async (isMeal) => {
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const url = isMeal ? mealsURL : drinksURL;
  const response = await fetch(url);
  const categories = await response.json();
  return categories;
};
