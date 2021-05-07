import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import paths from '../routes/paths';

const { FOOD_IN_PROGRESS } = paths;

const Card = ({ recipe, index }) => {
  const history = useHistory();
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <p data-testid={ `${index}-card-name` }>{recipe.strDrink || recipe.strMeal}</p>
      <button type="button" onClick={ () => history.push(FOOD_IN_PROGRESS) }>
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          width="150px"
          alt="Imagem da receita"
          data-testid={ `${index}-card-img` }
        />
      </button>
    </div>
  );
};

Card.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

export default Card;
