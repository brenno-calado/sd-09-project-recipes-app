export const fetchFood = async (query, value) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${query}=${value}`);
    const obj = await response.json();
    console.log(obj);
    return obj;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrink = async (query, value) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${query}=${value}`);
    const obj = await response.json();
    console.log(obj);
    return obj;
  } catch (error) {
    console.log(error);
  }
};
