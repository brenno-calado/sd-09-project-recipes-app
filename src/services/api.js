export const fetchForIngredients = async (ingredient, isMeal) => {
  const mealsURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const drinksURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const url = isMeal ? mealsURL : drinksURL;
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

export const fetchForFirstLetter = async (firstLetter, isMeal) => {
  const mealsURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const drinksURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const url = isMeal ? mealsURL : drinksURL;
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

export const fetchIngredientsList = async (isMeal) => {
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const url = isMeal ? mealsURL : drinksURL;
  const response = await fetch(url);
  const categories = await response.json();
  return categories;
};

export const fetchRecipeDetails = async (id, isMeal) => {
  const mealsURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drinksURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const url = isMeal ? mealsURL : drinksURL;
  const response = await fetch(url);
  const details = await response.json();
  return isMeal ? details.meals[0] : details.drinks[0];
};

export const fetchRandomRecipe = async (isMeal) => {
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const url = isMeal ? mealsURL : drinksURL;
  const response = await fetch(url);
  const recipe = await response.json();
  return recipe;
};
