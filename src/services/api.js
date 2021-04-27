export const fetchForIngredients = async (ingredient) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(url);
  const listOfIngredients = await response.json();
  return listOfIngredients;
};

export const fecthForName = async (name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(url);
  const listOfName = await response.json();
  return listOfName;
};

export const fetchForFirstLetter = async (firstLetter) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(url);
  const listOfName = await response.json();
  return listOfName;
};
