const searchDrinkForIngredient = async (ingredient) => {
  const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const resp = await fetchApi.json();
  return resp;
};

const searchDrinkForName = async (name) => {
  const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const resp = await fetchApi.json();
  return resp;
};

const searchDrinkForFirstLetter = async (letter) => {
  const fetchApi = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const resp = await fetchApi.json();
  return resp;
};

const textAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

const DrinksApi = async (inputSearch, typeSearch) => {
  if (typeSearch === 'ingredient') {
    const result = await searchDrinkForIngredient(inputSearch);
    if (result.drinks === null) {
      alert(textAlert);
    }
    return result;
  }
  if (typeSearch === 'name') {
    const result = await searchDrinkForName(inputSearch);
    if (result.drinks === null) {
      alert(textAlert);
    }
    return result;
  }
  if (typeSearch === 'first-letter') {
    const result = await searchDrinkForFirstLetter(inputSearch);
    if (result.drinks === null) {
      alert(textAlert);
    }
    return result;
  }
};

export default DrinksApi;
