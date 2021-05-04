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
      <iframe
        width="600"
        height="400"
        src={ `https://www.youtube.com/embed/${recipeUrl}` }
        title={ title }
      />);
  }
}

export function saveAsFavorite(id, recipe) {
  if (localStorage.getItem('favoriteRecipes') === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
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

// export function copyText() {
//   const timeout = 1000;
//   setUrlCopied('Link copiado!');
//   setTimeout(() => {
//     setUrlCopied('');
//   }, timeout);
// }
