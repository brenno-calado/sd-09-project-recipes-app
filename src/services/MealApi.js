const searchMealForIngredient = async (ingredient) => {
  try {
    const fetchApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const resp = await fetchApi.json();
    return resp;
  } catch (error) {
    console.log(error);
  }
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

const textAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

const MealsApi = async (inputSearch, typeSearch) => {
  if (typeSearch === 'ingredient') {
    const result = await searchMealForIngredient(inputSearch);
    if (result.meals === null) {
      alert(textAlert);
    }
    return result;
  }
  if (typeSearch === 'name') {
    const result = await searchMealForName(inputSearch);
    if (result.meals === null) {
      alert(textAlert);
    }
    return result;
  }
  if (typeSearch === 'first-letter') {
    const result = await searchMealForFirstLetter(inputSearch);
    if (result.meals === null) {
      alert(textAlert);
    }
    return result;
  }
};

export default MealsApi;
