export async function getDrinks() {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';
  const response = await fetch(endPoint)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return response.drinks;
}

export async function getDrinksByIngredient(ingredient) {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endPoint)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return response.drinks;
}

export async function getDrinksByName(name) {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(endPoint)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return response.drinks;
}

export async function getDrinksByFirstLetter(letter) {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
  const response = await fetch(endPoint)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return response.drinks;
}
