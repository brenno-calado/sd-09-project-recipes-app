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
