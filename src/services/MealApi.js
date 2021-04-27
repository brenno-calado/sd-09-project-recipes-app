const searchMealForIngredient = async (ingredient) => {
  const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const resp = await fetchApi.json();
  return resp;
};

const searchMealForName = async (name) => {
  const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const resp = await fetchApi.json();
  return resp;
};

const searchMealForFirstLetter = async (letter) => {
  const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const resp = await fetchApi.json();
  return resp;
};

const MealsApi = async (inputSearch, typeSearch) => {
  if (typeSearch === 'ingredient') {
    const result = await searchMealForIngredient(inputSearch);
    return result;
  }
  if (typeSearch === 'name') {
    const result = await searchMealForName(inputSearch);
    return result;
  }
  if (typeSearch === 'first-letter') {
    const result = await searchMealForFirstLetter(inputSearch);
    return result;
  }
};

export default MealsApi;
