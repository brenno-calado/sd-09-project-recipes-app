export const deleteLocalStorageItem = (recipe) => {
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const deletedStorage = storage.filter(
    (recipeItem) => recipeItem.id !== recipe.id,
  );
  localStorage.setItem('favoriteRecipes', deletedStorage);
  return deletedStorage;
};

export const setInitialLocalStorage = () => {
  const storage = localStorage.getItem('favoriteRecipes');
  if (storage) {
    return JSON.parse(storage);
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  return [];
};

export const updateLocalStorageItem = (recipe) => {
  let output = [];
  if (localStorage.getItem('favoriteRecipes')) setInitialLocalStorage();
  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (
    storage.find(
      (recipeStored) => recipeStored.id === recipe.id,
    )
  ) output = deleteLocalStorageItem(recipe);
  else output = [...storage, recipe];
  localStorage.setItem('favoriteRecipes', JSON.stringify(output));
  return output;
};
