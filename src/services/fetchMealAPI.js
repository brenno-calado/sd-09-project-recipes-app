const CATEGORY_API = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export const fetchMealIngredientAPI = async (ingredient) => {
  try {
    const mealAPI = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const meals = await fetch(mealAPI).then((response) => response.json());
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMealNameAPI = async (name) => {
  try {
    const mealAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const meals = await fetch(mealAPI).then((response) => response.json());
    return meals;
  } catch (error) {
    // console.log(error);
  }
};

export const fetchMealLetterAPI = async (letter) => {
  try {
    const mealAPI = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
    const meals = await fetch(mealAPI).then((response) => response.json());
    return meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMealCategory = async () => {
  try {
    return await fetch(CATEGORY_API).then((response) => response.json());
  } catch (error) {
    console.log(error);
  }
};

export const fetchFilteredByCategory = async (category) => {
  try {
    return await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then((response) => response.json());
  } catch (error) {
    console.log(error);
  }
};

export const fetchMealById = async (mealId) => {
  try {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const meal = await fetch(endPoint).then((response) => response.json());
    return meal;
  } catch (error) {
    console.log(error);
  }
};
