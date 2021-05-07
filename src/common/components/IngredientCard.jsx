import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDrinkIngredientAPI } from '../../services/fetchDrinkAPI';
import { fetchMealIngredientAPI } from '../../services/fetchMealAPI';

function IngredientCard(props) {
  const { index, ingredient, type } = props;
  const [url, setUrl] = useState();
  const [filteredByIngredient, setFilteredByIngredient] = useState(false);

  useEffect(() => {
    if (type === 'comida') {
      setUrl(`https://www.themealdb.com/images/ingredients/${ingredient}.png`);
    }
    if (type === 'bebida') {
      setUrl(`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`);
    }
  }, [ingredient, type]);

  async function getFilteredDrinks() {
    const bebidas = await fetchDrinkIngredientAPI(ingredient);
    setFilteredByIngredient(bebidas.drinks);
  }

  async function getFilteredMeals() {
    const comidas = await fetchMealIngredientAPI(ingredient);
    setFilteredByIngredient(comidas.meals);
  }

  function redirectToSearch() {
    if (type === 'comida') {
      getFilteredMeals();
    }
    if (type === 'bebida') {
      getFilteredDrinks();
    }
  }

  // console.log(filteredByIngredient);

  return (
    <button type="button" onClick={ redirectToSearch }>
      <div
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          width="150px"
          data-testid={ `${index}-card-img` }
          src={ url }
          alt="ingredient-thumb"
        />
        <h4
          data-testid={ `${index}-card-name` }
        >
          { ingredient }
        </h4>
        {(filteredByIngredient && type === 'bebida')
          ? <Redirect to="/bebidas" state={ filteredByIngredient } />
          : null }
      </div>
    </button>
  );
}

IngredientCard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  ingredient: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default IngredientCard;
