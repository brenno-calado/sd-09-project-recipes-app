import React from 'react';
import RecipeDoneCard from '../components/RecipeDoneCard';

function renderFood(favorite, setFavorite) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favoriteRecipe = favoriteRecipes && favoriteRecipes.map((
    { type, id, image, name, category, area,
    }, index,
  ) => {
    if (type === 'comida') {
      return (<RecipeDoneCard
        key={ Math.random() }
        image={ image }
        name={ name }
        index={ index }
        category={ category }
        area={ area }
        id={ id }
        setFavorite={ setFavorite }
        favorite={ favorite }
        type={ type }
      />);
    }
    return '';
  });
  return favoriteRecipe;
}

export default renderFood;
