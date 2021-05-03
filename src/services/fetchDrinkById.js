export const fetchDrinkById = async (ID) => {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`;
  try {
    const response = await fetch(`${ENDPOINT}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecommendedDrinkById = async () => {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(`${ENDPOINT}`);
    const result = await response.json();
    let index = 0;
    const resultWithIndex = result.meals.map((item) => {
      item.index = index;
      index += 1;
      return item;
    });
    return resultWithIndex;
  } catch (error) {
    console.log(error);
  }
};
