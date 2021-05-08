import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import { useRecipeContext } from '../contexts/recipeContext';

function ExploreDrinks() {
  const { getRecipesRandom } = useRecipeContext();
  const [randomDrink, setRandomDrink] = useState([]);

  useEffect(() => {
    getRecipesRandom('thecocktaildb')
      .then(({ drinks }) => setRandomDrink(drinks[0]));
  }, []);

  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 hasSearchBar={ false } data-testid="page-title">Explorar Bebidas</h1>
      </HeaderFoods>
      <Link to="/explorar/bebidas/ingredientes">
        <Button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </Button>
      </Link>
      <Link to={ `/bebidas/${randomDrink.idDrink}` }>
        <Button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </Button>
      </Link>
      <BottomMenu />
    </>
  );
}

export default ExploreDrinks;
