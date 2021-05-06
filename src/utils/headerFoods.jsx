import React from 'react';
import RecipeCard from '../components/RecepiCard';

function createRender(list) {
  const type = 'comidas';
  const twelve = 12;
  return list && list.map(({ idMeal, strMealThumb, strMeal }, index) => (
    index < twelve && (
      <RecipeCard
        key={ idMeal }
        image={ strMealThumb }
        name={ strMeal }
        recipeCArdId={ `${index}-recipe-card` }
        cardImageId={ `${index}-card-img` }
        cardNameId={ `${index}-card-name` }
        type={ type }
        codeId={ idMeal }
      />
    )
  ));
}

export default createRender;
