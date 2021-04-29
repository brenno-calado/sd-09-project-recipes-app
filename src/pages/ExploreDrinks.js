import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { getRandomDrink } from '../services/drinksAPI.js';

const ExploreDrinks = () => {
  const [drink, setDrink] = useState();
  const [redirect, setRedirect] = useState(false);

  const getDrink = async () => {
    const ramdomDrink = await getRandomDrink();
    setDrink(ramdomDrink.drinks[0]);
    setRedirect(true);
  };

  if (redirect && drink !== undefined) {
    console.log(drink.idDrink);
    return <Redirect to={ `/bebidas/${drink.idDrink}` } />;
  }

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <br />
      <div className="buttons">
        <Link to="/explorar/bebidas/ingredientes">
          <Button
            block
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </Button>
        </Link>
        <br />
        <Button
          block
          data-testid="explore-surprise"
          onClick={ () => getDrink() }
        >
          Me Surpreenda!
        </Button>
      </div>
      <br />
      <Menu />
    </div>
  );
};
export default ExploreDrinks;
