export const startLocalStorage = (email) => {
  localStorage.user = JSON.stringify({ email });
  localStorage.mealsToken = 1;
  localStorage.cocktailsToken = 1;
  localStorage.doneRecipes = JSON.stringify([]);
  localStorage.favoriteRecipes = JSON.stringify([]);
  localStorage.inProgressRecipes = JSON.stringify({ cocktails: {}, meals: {} });
};

export const updateLocalStorage = (action, key, data) => {
  switch (action) {
  case 'doneRecipes':
    localStorage[key] = JSON.stringify([...localStorage[key], data]);
    break;
  case 'inProgressRecipes':
    localStorage.inProgressRecipes = JSON.stringify({
      ...localStorage.inProgressRecipes,
      [key]: {
        ...localStorage.inProgressRecipes[key],
        data,
      },
    });
    break;
  default:
    localStorage.favoriteRecipes = JSON.stringify([
      ...localStorage.favoriteRecipes,
      data]);
    break;
  }
};

export const getItemLocalStorage = (item) => JSON.parse(localStorage.getItem(item));
