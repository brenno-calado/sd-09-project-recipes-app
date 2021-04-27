export const fetchMealById = async (ID) => {
  console.log(ID);
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`;
  try {
    const response = await fetch(`${ENDPOINT}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinkById = async (ID) => {
//   const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';

  //   try {
  //     const response = await fetch(`${ENDPOINT}${query}=${value}`);
  //     const obj = await response.json();
  //     return obj;
  //   } catch (error) {
  //     console.log(error);
  //   }
  console.log(ID);
  return ID;
};
