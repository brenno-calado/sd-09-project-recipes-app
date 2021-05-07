import { setInProgressStorage } from './index';

export function filterIngredients(recipe) {
  const recipeIngredients = Object
    .entries(recipe).filter((key) => (
      key[0].includes('Ingredient') && key[1] !== '' && key[1] !== null
    ));
  const recipeIngredientsMeasures = Object
    .entries(recipe).filter((key) => (
      key[0].includes('Measure') && key[1] !== '' && key[1] !== null
    ));
  const recipeIngredientsAndMeasures = [];
  recipeIngredients.forEach((ingr, index) => {
    recipeIngredientsAndMeasures
      .push(`${ingr[1]}: ${recipeIngredientsMeasures[index][1]}`);
  });
  return recipeIngredientsAndMeasures;
}

export function checkRecipesInProgress(id, type, ingredientsList) {
  setInProgressStorage();
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!Object.keys(recipesInProgress[type]).some((item) => item === id)) {
    const setRecipesInProgress = {
      ...recipesInProgress,
      [type]: {
        ...recipesInProgress[type],
        [id]: ingredientsList,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(setRecipesInProgress));
  }
}

export function checkDoneRecipes(id) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!Object.keys(doneRecipes).some((item) => item === id)) {
    return false;
  }
}

export function saveMealAsFavorite(id, recipe) {
  const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favoritesList.some((item) => item.id === id)) {
    const newFavorite = {
      id,
      type: 'comida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    favoritesList.push(newFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesList));
  } else {
    const newList = favoritesList.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
  }
}

export function saveDrinkAsFavorite(id, recipe) {
  const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favoritesList.some((item) => item.id === id)) {
    const newFavorite = {
      id,
      type: 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    favoritesList.push(newFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesList));
  } else {
    const newList = favoritesList.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
  }
}

export function saveDoneRecipes(id) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (!doneRecipes.some((item) => item === id)) {
    doneRecipes.push(id);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }
}
