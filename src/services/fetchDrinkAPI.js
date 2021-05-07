const CATEGORY_API = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const fetchDrinkIngredientAPI = async (ingredient) => {
  try {
    const mealAPI = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const meals = await fetch(mealAPI).then((response) => response.json());
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinkNameAPI = async (name) => {
  try {
    const mealAPI = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    const meals = await fetch(mealAPI).then((response) => response.json());
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinkLetterAPI = async (letter) => {
  try {
    const mealAPI = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
    const meals = await fetch(mealAPI).then((response) => response.json());
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinkCategory = async () => {
  try {
    return await fetch(CATEGORY_API).then((response) => response.json());
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinksFilteredByCategory = async (category) => {
  try {
    return await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`).then((response) => response.json());
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinkById = async (drinkId) => {
  try {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    const drink = await fetch(endPoint).then((response) => response.json());
    return drink;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRandomDrink = async () => {
  try {
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const drink = await fetch(endPoint).then((response) => response.json());
    return drink;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinkIngredients = async () => {
  try {
    const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const ingredients = await fetch(endPoint).then((response) => response.json());
    return ingredients;
  } catch (error) {
    console.log(error);
  }
};
