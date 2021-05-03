import { func } from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipiesContext } from '../context/RecipiesContext';

function randomRecipe(type) {
  // const { searchMealsList } = useContext(RecipiesContext);
  // console.log(searchMealsList);
  if (type === 'food') {
    const listMeals = [{ idMeal: '52977' }, { idMeal: '52978' }];
    const randomElement = listMeals[Math.floor(Math.random() * listMeals.length)];
    const surpriseMeal = randomElement.idMeal;
    // window.location.href = (`http://localhost:3000/comidas/${surpriseMeal}`);
    console.log(searchMealsList);
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
