export default async function fetchIngredients(page) {
  let endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  if (page === 'comidas') endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const resultApi = await fetch(endpoint);
  const result = await resultApi.json();
  console.log(result);
  return result;
}
