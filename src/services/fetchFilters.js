export const filtersFood = async () => {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  try {
    const response = await fetch(ENDPOINT);
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error(error);
  }
};

export const filtersDrink = async () => {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  try {
    const response = await fetch(ENDPOINT);
    const obj = await response.json();
    return obj;
  } catch (error) {
    return new Error(error);
  }
};
