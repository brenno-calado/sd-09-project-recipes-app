const DRINK_DB_BASE = 'https://www.thecocktaildb.com/api/json/v1/1/';

const getDrinkByName = async (name) => {
  try {
    const reqDrinkByName = await fetch(`${DRINK_DB_BASE}search.php?s=${name}`);
    const respByNameJson = await reqDrinkByName.json();
    return respByNameJson.drinks;
  } catch (error) {
    console.log('By name...', error);
  }
};

const getDrinks = async () => {
  const limit = 6;
  try {
    const reqDrinks = await fetch(`${DRINK_DB_BASE}search.php?s=`);
    const respJson = await reqDrinks.json();
    return respJson.drinks.splice(0, limit);
  } catch (error) {
    console.log('Drink... ', error);
  }
};

const getDrinkByFirstLetter = async (letter) => {
  try {
    const reqDrinkByLetter = await fetch(`${DRINK_DB_BASE}search.php?f=${letter}`);
    const respByLetter = await reqDrinkByLetter.json();
    return respByLetter.drinks;
  } catch (error) {
    console.log('By letter', error);
  }
};

const getDrinkByIngredients = async (ingredient) => {
  try {
    const reqDrinkByIngred = await fetch(`${DRINK_DB_BASE}filter.php?i=${ingredient}`);
    const respByIngredient = await reqDrinkByIngred.json();
    return respByIngredient.drinks;
  } catch (error) {
    console.log('By ingredient...', error);
  }
};

const getDrinkRandom = async () => {
  try {
    const reqDrinkRandom = await fetch(`${DRINK_DB_BASE}random.php`);
    const respRandomJson = await reqDrinkRandom.json();
    return respRandomJson.drinks;
  } catch (error) {
    console.log('Random...', error);
  }
};

const getDrinkById = async (id) => {
  try {
    const reqDrinkById = await fetch(`${DRINK_DB_BASE}lookup.php?i=${id}`);
    const respByIdJson = await reqDrinkById.json();
    return respByIdJson.drinks[0];
  } catch (error) {
    console.log('Drink by Id... ', error);
  }
};

export {
  getDrinks,
  getDrinkByName,
  getDrinkByFirstLetter,
  getDrinkByIngredients,
  getDrinkRandom,
  getDrinkById,
};
