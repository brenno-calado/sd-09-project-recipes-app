import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRandomRecipe } from '../../service/mealAPI';
import { fetchRandomDrink } from '../../service/cocktailAPI';

function ExploreDrinksOrFoods({ path }) {
  const [surpriseNumber, setSurpriseNumber] = useState([]);
  const pageFood = '/explorar/comidas';
  const pageDrink = '/explorar/bebidas';

  useEffect(() => {
    const fetch = async () => {
      if (path === pageFood) {
        const result = await fetchRandomRecipe();
        return setSurpriseNumber(result.meals[0].idMeal);
      }
      if (path === pageDrink) {
        const result = await fetchRandomDrink();
        return setSurpriseNumber(result.drinks[0].idDrink);
      }
    };
    fetch();
  }, [path]);

  const renderExploreByArea = () => {
    if (path === pageFood) {
      return (
        <>
          <Link
            to="/explorar/comidas/area"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </Link>
          <br />
        </>
      );
    }
  };

  return (
    <>
      <Link
        to={ `${path}/ingredientes` }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <br />
      { renderExploreByArea() }
      <Link
        to={
          path === pageFood
            ? `/comidas/${surpriseNumber}`
            : `/bebidas/${surpriseNumber}`
        }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </Link>
    </>
  );
}

ExploreDrinksOrFoods.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ExploreDrinksOrFoods;
