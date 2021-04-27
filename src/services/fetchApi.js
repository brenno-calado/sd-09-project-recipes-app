export async function getRecipeByIngredient(ingredient) {
  const promise = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await promise.json();
  return data;
}

export async function getRecipeByName(name) {
  const promise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await promise.json();
  return data;
}

export async function getRecipeByFirstLetter(firstLetter) {
  const promise = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await promise.json();
  return data;
}

export async function getDrinkByIngredient(ingredient) {
  const promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await promise.json();
  return data;
}

export async function getDrinkByName(name) {
  const promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await promise.json();
  return data;
}

export async function getDrinkByFirstLetter(firstLetter) {
  const promise = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const data = await promise.json();
  return data;
}
