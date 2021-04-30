const concatIngredients = (recipe, maxIngredients) => {
  const ingredientsArray = [];
  const MAX_NUMBER_OF_INGREDIENTS = maxIngredients;

  for (let index = 1; index <= MAX_NUMBER_OF_INGREDIENTS; index += 1) {
    const ingredient = `strIngredient${index}`;
    const measurement = `strMeasure${index}`;
    if (recipe[ingredient]) {
      if (recipe[measurement]) {
        ingredientsArray.push(`${recipe[ingredient]} - ${recipe[measurement]}`);
      } else {
        ingredientsArray.push(`${recipe[ingredient]}`);
      }
    }
  }
  return ingredientsArray;
};

export default concatIngredients;
