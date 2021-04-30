export const localStorageInitialState = () => {
  const inProgress = {
    cocktails: {},
    meals: {},
  };
  const myStorage = JSON.parse(localStorage.getItem('inProgress'));
  if (!myStorage) {
    localStorage.setItem('inProgress', JSON.stringify(inProgress));
  }
};

export const favoritesLocalStorageInitialState = () => {
  const favoriteRecipes = [];
  const myFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!myFavorites) {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }
};
