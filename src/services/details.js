import React from 'react';

export function renderIngredientsList(list) {
  return (
    list.map((item, index) => (
      <li
        key={ item }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { item }
      </li>
    ))
  );
}

export function renderVideo(url, title) {
  if (url !== undefined) {
    const recipeUrl = url.split('=')[1];
    return (
      <div data-testid="video">
        <iframe
          width="600"
          height="400"
          src={ `https://www.youtube.com/embed/${recipeUrl}` }
          title={ title }
        />
      </div>
    );
  }
}

export function saveAsFavorite(id, recipe, pathname) {
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!favoritesList.some((item) => item.id === id)) {
    const newFavoriteFood = {
      id,
      type: 'comida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    const newFavoriteDrink = {
      id,
      type: 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    favoritesList.push(pathname.includes('comidas') ? newFavoriteFood : newFavoriteDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesList));
  } else {
    const newList = favoritesList.filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
  }
}
