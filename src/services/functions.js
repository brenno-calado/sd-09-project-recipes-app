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

export function getIngredients(data, key) {
  const results = Object.entries(data).filter((e) => (
    e[0].includes(key) && e[1] !== null && e[1] !== ''));
  return results;
}

export function progressRecipes(value) {
  const recipes = JSON.parse(localStorage.getItem('progressRecipes'));
  const teste = recipes.filter((id) => id === value);
  if (teste.length === 0) {
    recipes.push(value);
    localStorage.setItem('progressRecipes', JSON.stringify(recipes));
    console.log(recipes);
  }
}

export function favoriteButton(idElement, setData) {
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const element = storage.filter(({ id }) => id !== idElement);
  setData(element);
  localStorage.setItem('favoriteRecipes', JSON.stringify(element));
}
