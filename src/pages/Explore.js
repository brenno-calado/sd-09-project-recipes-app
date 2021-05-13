import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';
import styles from './profile.module.css';

function Explore() {
  const [redirectFood, shouldRedirectFood] = useState(false);
  const [redirectDrink, shouldRedirectDrink] = useState(false);

  function exploreFoods() {
    shouldRedirectFood(true);
  }

  function exploreDrinks() {
    shouldRedirectDrink(true);
  }

  if (redirectFood) {
    return <Redirect to="/explorar/comidas" />;
  }

  if (redirectDrink) {
    return <Redirect to="/explorar/bebidas" />;
  }

  return (
    <div style={ { marginLeft: '-36px' } }>
      <HeaderFoods hasSearchBar={ false }>
        <h1 data-testid="page-title">Explorar</h1>
      </HeaderFoods>
      <ButtonGroup vertical className={ styles.profileBtn }>
        <Button
          onClick={ exploreFoods }
          variant="outline-danger"
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </Button>
        <Button
          onClick={ exploreDrinks }
          variant="outline-danger"
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </Button>
      </ButtonGroup>
      <BottomMenu />
    </div>
  );
}

export default Explore;
