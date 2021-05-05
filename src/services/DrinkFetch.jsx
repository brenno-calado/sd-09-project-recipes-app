const DRINK_DB_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

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

const getDrinkByIngredients = async (ingredient) => {
  try {
    const reqDrinkByIngred = await fetch(`${DRINK_DB_BASE}filter.php?i=${ingredient}`);
    const respByIngredient = await reqDrinkByIngred.json();
    return respByIngredient.drinks;
  } catch (error) {
    console.log('Drink By ingredient...', error);
  }
};

const getDrinkByCategory = async () => {
  try {
    const drinkByCategory = await fetch(`${DRINK_DB_BASE}list.php?c=list`);
    const respByCategoryJson = await drinkByCategory.json();
    console.log(respByCategoryJson.drinks);
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
  getDrinkByIngredients,
  getDrinkByCategory,
  getDrinkRandom,
};
