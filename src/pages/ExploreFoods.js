import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import { useRecipeContext } from '../contexts/recipeContext';
import styles from './profile.module.css';

function ExploreFoods() {
  const { getRecipesRandom } = useRecipeContext();
  const [randomFood, setRandomFood] = useState([]);
  const [redirectIngredient, shouldRedirectIngredient] = useState(false);
  const [redirectArea, shouldRedirectArea] = useState(false);
  const [redirectRandom, shouldRedirectRandom] = useState(false);

  useEffect(() => {
    getRecipesRandom('themealdb')
      .then(({ meals }) => setRandomFood(meals[0]));
  }, []);

  function exploreIngredient() {
    shouldRedirectIngredient(true);
  }

  function exploreDrinks() {
    shouldRedirectRandom(true);
  }

  function exploreArea() {
    shouldRedirectArea(true);
  }

  if (redirectIngredient) {
    return <Redirect to="/explorar/comidas/ingredientes" />;
  }

  if (redirectRandom) {
    return <Redirect to={ `/comidas/${randomFood.idMeal}` } />;
  }

  if (redirectArea) {
    return <Redirect to="/explorar/comidas/area" />;
  }

  return (
    <div style={ { marginLeft: '-36px' } }>
      <HeaderFoods hassearchbar={ false }>
        <h2 data-testid="page-title">Explorar Comidas</h2>
      </HeaderFoods>
      <ButtonGroup vertical className={ styles.profileBtn }>
        <Button
          onClick={ exploreIngredient }
          variant="outline-danger"
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </Button>
        <Button
          onClick={ exploreArea }
          variant="outline-danger"
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </Button>
        <Button
          onClick={ exploreDrinks }
          variant="outline-danger"
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </Button>
      </ButtonGroup>
      <BottomMenu />
    </div>
  );
}

export default ExploreFoods;
