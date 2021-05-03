import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveIngredient } from '../actions/Ingredients';
import '../Style/Ingredients.css';

function Ingredients({ index, name, type, sendIngredient }) {
  const link = type === 'meals'
    ? `https://www.themealdb.com/images/ingredients/${name}-Small.png`
    : `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;

  const path = type === 'meals'
    ? '/comidas'
    : '/bebidas';

  return (
    <Link to={ path } onClick={ () => sendIngredient(name) } className="card-ingredients">
      <div data-testid={ `${index}-ingredient-card` }>
        <img
          className="card-img"
          src={ link }
          data-testid={ `${index}-card-img` }
          alt="ingredient"
        />
        <p data-testid={ `${index}-card-name` }>
          {name}
        </p>
      </div>
    </Link>
  );
}

const mapDispatchToProps = (dispatch) => ({
  sendIngredient: (ingredient) => dispatch(saveIngredient(ingredient)),
});

Ingredients.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  sendIngredient: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ingredients);
