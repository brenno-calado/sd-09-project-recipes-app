import { getItemLocalStorage,
  updateLocalStorage } from './localStorageService';

const favoriteDrinkObject = (data) => ({
  id: data.idDrink,
  type: 'bebida',
  area: '',
  category: 'Cocktail',
  alcoholicOrNot: data.strAlcoholic,
  name: data.strDrink,
  image: data.strDrinkThumb,
});

const favoriteMealObject = (data) => ({
  id: data.idMeal,
  type: 'comida',
  area: data.strArea,
  category: data.strCategory,
  alcoholicOrNot: '',
  name: data.strMeal,
  image: data.strMealThumb,
});

export const addToFavorite = (page, data) => {
  const favoriteItem = (page === 'meals')
    ? favoriteMealObject(data) : favoriteDrinkObject(data);
  updateLocalStorage('doneOrFavoriteRecipes', 'favoriteRecipes', favoriteItem);
};

export const removeToFavorite = (id) => {
  const newFavoriteArray = localStorage.favoriteRecipes
  && getItemLocalStorage('favoriteRecipes')
    .filter(({ id: idItem }) => idItem !== id);
  console.log(newFavoriteArray);
  updateLocalStorage('updateFavoriteRecipes', null, newFavoriteArray);
};

export const verifyItemInFavorite = (id) => (
  localStorage.favoriteRecipes && getItemLocalStorage('favoriteRecipes')
    .some(({ id: idItem }) => idItem === id));
