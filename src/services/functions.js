import { fetchFoods, fetchDrinks } from './fetchAPI';

export async function functionFood(obj) {
  const {
    data,
    searchValue,
    setLocalRedirect,
    setShouldCards,
    setRecipes,
    setShouldRedirect } = obj;
  const textAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const { meals } = await fetchFoods(data, searchValue);
  if (meals === null) {
    return window.alert(textAlert);
  }
  if (meals.length === 1) {
    setLocalRedirect(`/comidas/${meals[0].idMeal}`);
    return setShouldRedirect(true);
  }
  setRecipes(meals);
  setShouldCards(true);
}

export async function functionDrink(obj) {
  const {
    data,
    searchValue,
    setLocalRedirect,
    setShouldCards,
    setRecipes,
    setShouldRedirect } = obj;
  const textAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const { drinks } = await fetchDrinks(data, searchValue);
  if (drinks === null) {
    return window.alert(textAlert);
  }
  if (drinks.length === 1) {
    setLocalRedirect(`/bebidas/${drinks[0].idDrink}`);
    setShouldRedirect(true);
  }
  setRecipes(drinks);
  setShouldCards(true);
}
