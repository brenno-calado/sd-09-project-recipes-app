const getDrinksAll = async () => {
  try {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    const drinks = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};
const getDrinksByCategory = async (category) => {
  try {
    const filterEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
    const response = await fetch(`${filterEndpoint}${category}`);
    const drinks = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

const getDrinksCategories = async () => {
  try {
    const categoriesEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(categoriesEndpoint);
    const drinksCategories = await response.json();
    return drinksCategories;
  } catch (error) {
    console.log(error);
  }
};

const getRandomDrink = async () => {
  try {
    const randomEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const data = await fetch(randomEndpoint);
    const result = await data.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getDrinkById = async (id) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const result = await fetch(url);
    const data = await result.json();
    return data.drinks[0];
  } catch (error) {
    console.log(error);
  }
};

export {
  getDrinkById,
  getDrinksAll,
  getRandomDrink,
  getDrinksByCategory,
  getDrinksCategories,
};
