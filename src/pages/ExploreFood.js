import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { getRandomFood } from '../services/foodAPI';

const ExploreFood = () => {
  const [food, setFood] = useState();
  const [redirect, setRedirect] = useState(false);

  const getFood = async () => {
    const ramdomFood = await getRandomFood();
    setFood(ramdomFood.meals[0]);
    setRedirect(true);
  };

  if (redirect && food !== undefined) {
    console.log(food);
    return <Redirect to={ `/comidas/${food.idMeal}` } />;
  }
  return (
    <div>
      <Header title="Explorar Comidas" />
      <br />
      <div className="buttons">
        <Link to="/explorar/comidas/ingredientes">
          <Button
            block
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </Button>
        </Link>
        <br />
        <Link to="/explorar/comidas/area">
          <Button
            block
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </Button>
        </Link>
        <br />
        <Button
          block
          data-testid="explore-surprise"
          onClick={ () => getFood() }
        >
          Me Surpreenda!
        </Button>
      </div>
      <br />
      <Menu />
    </div>
  );
};

export default ExploreFood;
