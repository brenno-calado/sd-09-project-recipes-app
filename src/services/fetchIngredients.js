const fetchIngredients = async (query) => {
  const endpoint = `https://www.the${query}db.com/api/json/v1/1/list.php?i=list`;
  const responseIngredients = await fetch(endpoint);
  const ingredients = await responseIngredients.json();
  if (query === 'meal') return ingredients.meals.map((item) => item.strIngredient);
  return ingredients.drinks.map((item) => item.strIngredient1);
};

export default fetchIngredients;
