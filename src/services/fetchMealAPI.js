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
