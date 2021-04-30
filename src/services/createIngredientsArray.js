const createIngredientsArray = (recipe) => {
  const ingredientsArray = [];
  const MAX_NUMBER_OF_INGREDIENTS = 20;

  for (let index = 1; index <= MAX_NUMBER_OF_INGREDIENTS; index += 1) {
    const ingredient = `strIngredient${index}`;
    const measurement = `strMeasure${index}`;

    if (recipe[ingredient]) {
      const myIngredient = {
        ingredient: recipe[ingredient],
        amount: recipe[measurement],
      };
      ingredientsArray.push(myIngredient);
    }
  }
  return ingredientsArray;
};

export default createIngredientsArray;
