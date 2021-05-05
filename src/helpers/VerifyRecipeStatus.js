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
  const result = finishedRecipes.find((item) => (
    item.id === recipe.idMeal || item.id === recipe.idDrink
  ));
  if (result !== undefined) return ('finished');
};

export const startRecipe = (recipe, recipeType) => {
  const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { cocktails, meals } = startedRecipes;
  if (recipeType === 'comidas' && !meals[recipe.idMeal]) {
    meals[recipe.idMeal] = {};
  }
  if (recipeType === 'bebidas' && !cocktails[recipe.idDrink]) {
    cocktails[recipe.idDrink] = {};
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(startedRecipes));
};

export const setLocalStorage = (recipe, recipeType) => {
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  if (!localStorage.getItem('inProgressRecipes')) {
    if (recipeType === 'comidas') {
      const object = {
        cocktails: {},
        meals: {
          [recipe.idMeal]: {},
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(object));
    }
    if (recipeType === 'bebidas') {
      const object = {
        cocktails: {
          [recipe.idDrink]: {},
        },
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(object));
    }
  }
  if (localStorage.getItem('inProgressRecipes')) {
    const currentRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isStarted = verifyIfRecipeWasStarted(recipe);
    if (recipeType === 'comidas' && !isStarted) {
      const { meals } = currentRecipe;
      meals[recipe.idMeal] = {};
    }
    if (recipeType === 'bebidas' && !isStarted) {
      const { cocktails } = currentRecipe;
      cocktails[recipe.idDrink] = {};
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(currentRecipe));
  }
};
