import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const ExploreDrinksOrFood = () => {
  const [type] = useState(() => {
    if (window.location.href.includes('bebidas')) return 'bebidas';
    if (window.location.href.includes('comidas')) return 'comidas';
  });
  const [randomId, setRandomId] = useState();
  useEffect(() => console.log(randomId), [randomId]);

  const getRandomRecipe = () => {
    if (type === 'comidas') {
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((result) => result.json()
          .then((data) => setRandomId(data.meals[0].idMeal)))
        .catch((e) => console.log(e));
    } else {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((result) => result.json()
          .then((data) => setRandomId(data.drinks[0].idDrink)));
    }
  };
  return (
    <div>
      { randomId && <Redirect to={ `/${type}/${randomId}` } /> }
      <Link to={ `/explorar/${type}/ingredientes` }>
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      { type === 'comidas'
        && (
          <Link to={ `/explorar/${type}/area` }>
            <button
              type="button"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
        ) }
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getRandomRecipe }
      >
        Me Surpreenda!
      </button>
    </div>
  );
};

export default ExploreDrinksOrFood;
