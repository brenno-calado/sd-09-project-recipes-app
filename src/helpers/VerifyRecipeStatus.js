export const verifyIfRecipeWasStarted = (recipe) => {
  const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { cocktails, meals } = startedRecipes;
  let mealsStarted;
  let cocktailsStarted;
  if (meals) {
    const mealsKeys = Object.keys(meals);
    mealsStarted = mealsKeys.some((key) => (
      key === recipe.idMeal
    ));
  }
  if (cocktails) {
    const cocktailsKeys = Object.keys(cocktails);
    cocktailsStarted = cocktailsKeys.some((key) => (
      key === recipe.idDrink
    ));
  }
  if (mealsStarted || cocktailsStarted) return ('started');
};

export const verifyIfRecipeWasFinished = (recipe) => {
  const finishedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const mealsFinished = finishedRecipes.some((item) => (
    item.idMeal === recipe.idMeal
  ));
  const cocktailsFinished = finishedRecipes.some((item) => (
    item.idDrink === recipe.idDrink
  ));
  if (mealsFinished || cocktailsFinished) return ('finished');
};
