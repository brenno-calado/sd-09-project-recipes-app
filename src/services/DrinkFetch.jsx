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

export {
  getDrinkByName,
  getDrinkByFirstLetter,
  getDrinkByIngredients,
  getDrinkRandom,
};
