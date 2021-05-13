import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import { useRecipeContext } from '../contexts/recipeContext';
import styles from './profile.module.css';

function ExploreDrinks() {
  const { getRecipesRandom } = useRecipeContext();
  const [randomDrink, setRandomDrink] = useState([]);
  const [redirectIngredient, shouldRedirectIngredient] = useState(false);
  const [redirectRandom, shouldRedirectRandom] = useState(false);

  useEffect(() => {
    getRecipesRandom('thecocktaildb')
      .then(({ drinks }) => setRandomDrink(drinks[0]));
  }, []);

  function exploreIngredient() {
    shouldRedirectIngredient(true);
  }

  function exploreRandom() {
    shouldRedirectRandom(true);
  }

  if (redirectIngredient) {
    return <Redirect to="/explorar/bebidas/ingredientes" />;
  }

  if (redirectRandom) {
    return <Redirect to={ `/bebidas/${randomDrink.idDrink}` } />;
  }

  return (
    <div style={ { marginLeft: '-36px' } }>
      <HeaderFoods hasSearchBar={ false }>
        <h2 hasSearchBar={ false } data-testid="page-title">Explorar Bebidas</h2>
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
          onClick={ exploreRandom }
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

export default ExploreDrinks;
