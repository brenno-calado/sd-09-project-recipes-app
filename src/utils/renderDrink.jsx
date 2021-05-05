import React from 'react';
import RecipeDoneCard from '../components/RecipeDoneCard';

function renderDrink(favorite, setFavorite) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favoriteRecipe = favoriteRecipes && favoriteRecipes.map((
    { type, id, image, name, area, alcoholicOrNot,
    }, index,
  ) => {
    if (type === 'bebida') {
      return (<RecipeDoneCard
        key={ Math.random() }
        image={ image }
        name={ name }
        index={ index - 1 }
        category={ alcoholicOrNot }
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

export default renderDrink;
