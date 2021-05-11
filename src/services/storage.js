const loadStorageOrAlternative = (storageKey, alternativeValue) => {
  const existingData = localStorage.getItem(storageKey) || alternativeValue;
  return JSON.parse(existingData);
};

const saveStorageDataWithKey = (data, storageKey) => {
  localStorage.setItem(storageKey, JSON.stringify(data));
};

export const saveTokens = () => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

export const saveUser = (email) => {
  saveStorageDataWithKey({ email }, 'user');
  // localStorage.setItem('user', JSON.stringify({ email }));
};

export const getUserData = () => loadStorageOrAlternative(
  'user',
  '{ "email": "Não informado" }',
);

const getDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatFavoriteRecipe = (recipe) => ({
  id: recipe.idMeal || recipe.idDrink,
  type: (recipe.idMeal && 'comida') || (recipe.idDrink && 'bebida'),
  area: recipe.strArea || '',
  category: recipe.strCategory,
  alcoholicOrNot: recipe.strAlcoholic || '',
  name: recipe.strMeal || recipe.strDrink,
  image: recipe.strDrinkThumb || recipe.strMealThumb,
});

const formatDoneRecipe = (recipe) => ({
  ...formatFavoriteRecipe(recipe),
  doneDate: getDate(),
  tags: (recipe.strTags && recipe.strTags.split(',')) || '',
});

const loadFavoritesRecipes = () => loadStorageOrAlternative('favoriteRecipes', '[]');

const saveFavoritesRecipes = (recipes) => {
  saveStorageDataWithKey(recipes, 'favoriteRecipes');
};

const getRecipeIdAndType = (recipe) => {
  const recipeId = recipe.idMeal || recipe.idDrink;
  const recipeType = (recipe.idMeal && 'comida') || (recipe.idDrink && 'bebida');
  return { recipeId, recipeType };
};

export const checkIfFavoriteRecipe = (recipe) => {
  const parsedRecipes = loadFavoritesRecipes();
  const { recipeId, recipeType } = getRecipeIdAndType(recipe);
  return parsedRecipes.some(({ id, type }) => recipeId === id && recipeType === type);
};

export const saveSingleFavoriteRecipe = (recipe) => {
  if (!checkIfFavoriteRecipe(recipe)) {
    const parsedRecipes = loadFavoritesRecipes();
    const formattedRecipe = formatFavoriteRecipe(recipe);
    saveFavoritesRecipes([...parsedRecipes, formattedRecipe]);
  }
};

export const removeRecipeFromFavorites = (recipe, ...idAndType) => {
  let { recipeId, recipeType } = getRecipeIdAndType(recipe);
  if (idAndType.length > 1) {
    [recipeId, recipeType] = idAndType;
  }
  const remainingRecipes = loadFavoritesRecipes()
    .filter(({ id, type }) => recipeId !== id && recipeType !== type);
  saveFavoritesRecipes(remainingRecipes);
};

const loadDoneRecipes = () => loadStorageOrAlternative('doneRecipes', '[]');

export const saveDoneRecipe = (recipe) => {
  const parsedRecipes = loadDoneRecipes();
  const formattedRecipe = formatDoneRecipe(recipe);
  saveStorageDataWithKey([...parsedRecipes, formattedRecipe], 'doneRecipes');
};

export const checkIfDoneRecipe = (recipe) => {
  const parsedRecipes = loadDoneRecipes();
  const { recipeId, recipeType } = getRecipeIdAndType(recipe);
  return parsedRecipes.some(({ id, type }) => recipeId === id && recipeType === type);
};

export const loadRecipesInProgress = (typeKey) => (
  loadStorageOrAlternative('inProgressRecipes', '{}')[typeKey] || {}
);

export const saveRecipeInProgress = (typeKey, recipeId, recipeProgress) => {
  const parsedRecipes = loadStorageOrAlternative('inProgressRecipes', '{}');
  const newRecipeObj = { [recipeId]: recipeProgress };
  const newRecipesForType = { ...parsedRecipes[typeKey], ...newRecipeObj };
  saveStorageDataWithKey(
    { ...parsedRecipes, [typeKey]: newRecipesForType },
    'inProgressRecipes',
  );
};

export const getRecipeInProgress = (recipe) => {
  const { recipeId } = getRecipeIdAndType(recipe);
  const typeKey = (recipe.idMeal && 'meals') || (recipe.idDrink && 'cocktails');
  const recipesOfType = loadRecipesInProgress(typeKey);
  return recipesOfType[recipeId];
};
