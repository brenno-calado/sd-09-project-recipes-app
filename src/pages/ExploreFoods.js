import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import { useRecipeContext } from '../contexts/recipeContext';

function ExploreFoods() {
  const { getRecipesRandom } = useRecipeContext();
  const [randomFood, setRandomFood] = useState([]);

  useEffect(() => {
    getRecipesRandom('themealdb')
      .then(({ meals }) => setRandomFood(meals[0]));
  }, []);

  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Explorar Comidas</h1>
      </HeaderFoods>
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${randomFood.idMeal}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <BottomMenu />
    </>
  );
}

export default ExploreFoods;
