export async function getMeals() {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Ordinary_Drink';
  const response = await fetch(endPoint)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return response.meals;
}

export async function getMealsByIngredient(ingredient) {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endPoint)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return response.meals;
}

export async function getMealsByName(name) {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(endPoint)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return response.meals;
}

export async function getMealsByFirstLetter(letter) {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  const response = await fetch(endPoint)
    .then((data) => data.json())
    .catch((error) => console.log(error));

  return response.meals;
}
