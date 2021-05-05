const MEAL_DB_BASE = 'https://www.themealdb.com/api/json/v1/1/';

const getMealsByName = async (name) => {
  try {
    const mealDBReqByName = await fetch(`${MEAL_DB_BASE}search.php?s=${name}`);
    const respByNameJson = await mealDBReqByName.json();
    // console.log('fetch', respByNameJson.meals);
    return respByNameJson.meals;
  } catch (error) {
    console.log('Meal By name...', error);
  }
};

const getMealByFirstLetter = async (letter) => {
  try {
    const mealDBReqByLetter = await fetch(`${MEAL_DB_BASE}search.php?f=${letter}`);
    const respByLetterJson = await mealDBReqByLetter.json();
    return respByLetterJson.meals;
  } catch (error) {
    console.log('Meal By letter...', error);
  }
};

const getMealByIngredients = async (ingredient) => {
  try {
    const mealDBByIngredient = await fetch(`${MEAL_DB_BASE}filter.php?i=${ingredient}`);
    const respByIngredientJson = await mealDBByIngredient.json();
    return respByIngredientJson.meals;
  } catch (error) {
    console.log('Meal By ingredient...', error);
  }
};

const getMealByCategory = async () => {
  try {
    const mealByCategory = await fetch(`${MEAL_DB_BASE}list.php?c=list`);
    const respByCategoryJson = await mealByCategory.json();
    // console.log(respByCategoryJson.meals);
    return respByCategoryJson.meals;
  } catch (error) {
    console.log('Meal By category...', error);
  }
};

const getMealsRandom = async () => {
  try {
    const mealDBReqRandom = await fetch(`${MEAL_DB_BASE}random.php`);
    const respRandomJson = await mealDBReqRandom.json();
    return respRandomJson.meals;
  } catch (error) {
    console.log('Meal Random...', error);
  }
};

export {
  getMealsByName,
  getMealsRandom,
  getMealByFirstLetter,
  getMealByIngredients,
  getMealByCategory,
};
