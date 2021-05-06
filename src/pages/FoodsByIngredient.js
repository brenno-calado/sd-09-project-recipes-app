import React, { useEffect, useState } from 'react';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import { useRecipeContext } from '../contexts/recipeContext';
import RecipeCard from '../components/RecepiCard';

function FoodsByIngredient() {
  const { getIngredients } = useRecipeContext();
  const [ingredients, setIngredients] = useState([]);
  const twelve = 12;
  const type = 'comidas/ingredientes';

  useEffect(() => {
    getIngredients('themealdb')
      .then(({ meals }) => setIngredients(meals));
  }, [getIngredients]);

  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Explorar Ingredientes</h1>
      </HeaderFoods>
      <h1>Comidas por ingrediente</h1>
      {ingredients.length && ingredients
        .map(({ idIngredient, strIngredient }, index) => index < twelve && (
          <RecipeCard
            key={ idIngredient }
            image={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            name={ strIngredient }
            recipeCArdId={ `${index}-ingredient-card` }
            cardImageId={ `${index}-card-img` }
            cardNameId={ `${index}-card-name` }
            type={ type }
            codeId={ idIngredient }
          />
        )) }
      <BottomMenu />
    </>
  );
}

export default FoodsByIngredient;
