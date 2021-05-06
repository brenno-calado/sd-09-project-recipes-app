import React from 'react';
import { Link } from 'react-router-dom';
import { randomMeal, randomDrink } from '../services/api';

async function randomRecipe(type) {
  if (type === 'food') {
    const mealNumber = await randomMeal();
    window.location.href = (`http://localhost:3000/comidas/${mealNumber}`);
  } else {
    const drinkNumber = await randomDrink();
    window.location.href = (`http://localhost:3000/bebidas/${drinkNumber}`);
  }
}

function Explorer({ type }) {
  if (type === 'global') {
    return (
      <div>
        <Link to="/explorar/comidas">
          <button type="button" data-testid="explore-food">
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button type="button" data-testid="explore-drinks">
            Explorar Bebidas
          </button>
        </Link>
      </div>
    );
  }
  if (type === 'foods') {
    return (
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area">
            Por Local de Origem
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => randomRecipe('food') }
        >
          Me Surpreenda!
        </button>
      </div>
    );
  }
  if (type === 'drinks') {
    return (
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ () => randomRecipe('drink') }
        >
          Me Surpreenda!
        </button>
      </div>
    );
  }
}

export default Explorer;
