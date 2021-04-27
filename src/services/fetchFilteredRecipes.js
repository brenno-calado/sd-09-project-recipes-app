export const filteredFoods = async (filter) => {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
  try {
    const response = await fetch(ENDPOINT);
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error(error);
  }
};

export const filteredDrinks = async (filter) => {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
  try {
    const response = await fetch(ENDPOINT);
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error(error);
  }
};
