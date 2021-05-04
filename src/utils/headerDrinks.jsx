import React from 'react';
import RecipeCard from '../components/RecepiCard';

function createRender(list) {
  const type = 'bebidas';
  const twelve = 12;
  return list.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
    index < twelve && (
      <RecipeCard
        key={ idDrink }
        image={ strDrinkThumb }
        name={ strDrink }
        recipeCArdId={ `${index}-recipe-card` }
        cardImageId={ `${index}-card-img` }
        cardNameId={ `${index}-card-name` }
        type={ type }
        codeId={ idDrink }
      />
    )
  ));
}

export default createRender;
