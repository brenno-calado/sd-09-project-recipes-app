import React from 'react';
import RecipeCard from '../components/RecepiCard';

function createRender(list) {
  const twelve = 12;
  return list.map(({ idMeal, strMealThumb, strMeal }, index) => (
    index < twelve && (
      <RecipeCard
        key={ idMeal }
        image={ strMealThumb }
        name={ strMeal }
        recipeCArdId={ `${index}-recipe-card` }
        cardImageId={ `${index}-card-img` }
        cardNameId={ `${index}-card-name` }
      />
    )
  ));
}

export default createRender;
