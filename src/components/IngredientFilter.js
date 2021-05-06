export default function ingredientFilter(recipe) {
  const headers = Object.keys(recipe);
  const ingredients = headers.filter((i) => i.includes('strIngredient'));
  const ingredientList = ingredients.map((ing, index) => {
    const newIngredient = {
      item: recipe[ing],
      measure: recipe[`strMeasure${index + 1}`],
    };
    if (!newIngredient.item) return null;
    if (!newIngredient.measure) newIngredient.measure = '';
    return newIngredient;
  });
  const allIngredients = ingredientList.filter((i) => i !== null);
  return allIngredients;
}
