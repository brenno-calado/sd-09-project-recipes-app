export const fetchFood = async (query, value) => {
  let ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
  if (query !== 'i') {
    ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?';
  }
  try {
    const response = await fetch(`${ENDPOINT}${query}=${value}`);
    const obj = await response.json();
    console.log(obj);
    return obj;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrink = async (query, value) => {
  let ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';
  if (query !== 'i') {
    ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';
  }
  try {
    const response = await fetch(`${ENDPOINT}${query}=${value}`);
    const obj = await response.json();
    console.log(obj);
    return obj;
  } catch (error) {
    console.log(error);
  }
};
