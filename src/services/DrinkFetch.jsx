const DRINK_DB_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';
const IMAGES_DB_BASE = 'www.thecocktaildb.com/images/ingredients/';

const getDrinkByName = async (name) => {
  try {
    const reqDrinkByName = await fetch(`${DRINK_DB_BASE}search.php?s=${name}`);
    const respByNameJson = await reqDrinkByName.json();
    return respByNameJson.drinks;
  } catch (error) {
    console.log('Drink By name...', error);
  }
};

const getDrinkByFirstLetter = async (letter) => {
  try {
    const reqDrinkByLetter = await fetch(`${DRINK_DB_BASE}search.php?f=${letter}`);
    const respByLetter = await reqDrinkByLetter.json();
    return respByLetter.drinks;
  } catch (error) {
    console.log('Drink By letter', error);
  }
};

const getDrinksIngredients = async () => {
  try {
    const drinkIngredients = await fetch(`${DRINK_DB_BASE}list.php?i=list`);
    const respDrinkIngredients = await drinkIngredients.json();
    return respDrinkIngredients.drinks;
  } catch (error) {
    console.log('Get drink ingredinents...', error);
  }
};

const getIngredientsImage = async (ingredient) => {
  try {
    const requestImages = await fetch(`${IMAGES_DB_BASE}${ingredient}-Medium.png`);
    const responseImages = await requestImages.json();
    return responseImages;
  } catch (error) {
    console.log('Get image ingredinent...', error);
  }
};

const getDrinkByIngredients = async (ingredient) => {
  try {
    const reqDrinkByIngred = await fetch(`${DRINK_DB_BASE}filter.php?i=${ingredient}`);
    const respByIngredient = await reqDrinkByIngred.json();
    return respByIngredient.drinks;
  } catch (error) {
    console.log('Drink By ingredient...', error);
  }
};

const getDrinkCategorys = async () => {
  try {
    const drinkCategorys = await fetch(`${DRINK_DB_BASE}list.php?c=list`);
    const respCategorysJson = await drinkCategorys.json();
    // console.log(respCategorysJson.drinks);
    return respCategorysJson.drinks;
  } catch (error) {
    console.log('Drink By category...', error);
  }
};

const getDrinkByCategory = async (category) => {
  try {
    const drinkByCategory = await fetch(`${DRINK_DB_BASE}filter.php?c=${category}`);
    const respByCategoryJson = await drinkByCategory.json();
    // console.log(respByCategoryJson.drinks);
    return respByCategoryJson.drinks;
  } catch (error) {
    console.log('Drink By category...', error);
  }
};

const getDrinkRandom = async () => {
  try {
    const reqDrinkRandom = await fetch(`${DRINK_DB_BASE}random.php`);
    const respRandomJson = await reqDrinkRandom.json();
    return respRandomJson.drinks;
  } catch (error) {
    console.log('Drink Random...', error);
  }
};

export {
  getDrinkByName,
  getDrinkByFirstLetter,
  getDrinksIngredients,
  getIngredientsImage,
  getDrinkByIngredients,
  getDrinkCategorys,
  getDrinkByCategory,
  getDrinkRandom,
};
