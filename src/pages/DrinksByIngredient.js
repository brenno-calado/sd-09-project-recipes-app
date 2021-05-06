import React, { useEffect, useState } from 'react';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import { useRecipeContext } from '../contexts/recipeContext';
import RecipeCard from '../components/RecepiCard';

function DrinksByIngredient() {
  const { getIngredients } = useRecipeContext();
  const [ingredients, setIngredients] = useState([]);
  const twelve = 12;
  const type = 'bebidas/ingredientes';

  useEffect(() => {
    getIngredients('thecocktaildb')
      .then(({ drinks }) => setIngredients(drinks));
  }, [getIngredients]);

  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Explorar Ingredientes</h1>
      </HeaderFoods>
      <h1>Bebidas por ingrediente</h1>
      {ingredients.length && ingredients
        .map(({ strIngredient1 }, index) => index < twelve && (
          <RecipeCard
            key={ strIngredient1 }
            image={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            name={ strIngredient1 }
            recipeCArdId={ `${index}-ingredient-card` }
            cardImageId={ `${index}-card-img` }
            cardNameId={ `${index}-card-name` }
            type={ type }
            codeId={ strIngredient1 }
          />
        )) }
      <BottomMenu />
    </>
  );
}

export default DrinksByIngredient;
