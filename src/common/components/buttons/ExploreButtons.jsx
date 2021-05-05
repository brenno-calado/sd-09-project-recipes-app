import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchRandomDrink } from '../../../services/fetchDrinkAPI';
import { fetchRandomMeal } from '../../../services/fetchMealAPI';

function ExploreButtons({ history, isAreaEnable, type }) {
  const [randomRecipe, setRandomRecipe] = useState();
  function handleExploreClick(filter) {
    history.push(`/explorar/${type}/${filter}`);
  }

  async function getRandomRecipe(fetchFunc, tp) {
    await fetchFunc().then((response) => setRandomRecipe(response[tp][0]));
  }

  function redirectRandomRecipe(param) {
    if (param === 'comidas') {
      getRandomRecipe(fetchRandomMeal, 'meals');
    }
    if (param === 'bebidas') {
      getRandomRecipe(fetchRandomDrink, 'drinks');
    }
  }

  if (randomRecipe) {
    const id = randomRecipe.idDrink || randomRecipe.idMeal;
    history.push(`/${type}/${id}`);
  }

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => handleExploreClick('ingredientes') }
      >
        Por Ingredientes
      </button>
      {isAreaEnable
      && (
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => handleExploreClick('area') }
        >
          Por Local de Origem
        </button>
      )}
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => redirectRandomRecipe(type) }
      >
        Me Surpreenda!
      </button>

    </div>
  );
}

ExploreButtons.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
  isAreaEnable: PropTypes.bool.isRequired,
};

export default ExploreButtons;
