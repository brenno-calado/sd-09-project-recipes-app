import React from 'react';
import RecipeCard from './RecipeCard';

function RenderRecipeCards({
  list,
  kindOfFood,
  cardsLimit,
}) {
  return list[kindOfFood].slice(0, cardsLimit).map((meal, index) => (
    <RecipeCard
      key={ index }
      index={ index }
      recipe={ meal }
    />
  ));
}

export default RenderRecipeCards;
