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
