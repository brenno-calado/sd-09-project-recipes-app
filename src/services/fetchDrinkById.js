export const fetchDrinkById = async (ID) => {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`;
  try {
    const response = await fetch(`${ENDPOINT}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecommendedDrinkById = async (category) => {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const response = await fetch(`${ENDPOINT}`);
    const result = await response.json();
    let index = 0;
    const resultWithIndex = result.drinks.map((item) => {
      item.index = index;
      index += 1;
      return item;
    });

    return resultWithIndex;
  } catch (error) {
    console.log(error);
  }
};
