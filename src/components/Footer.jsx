import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { getRecipesThunk } from '../Redux/actions';

function Footer({ getRecipes }) {
  return (
    <footer className="Footer" data-testid="footer">
      <Link to="/bebidas">
        <button
          type="button"
          onClick={ () => getRecipes(
            'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
            'drinks',
          ) }
        >
          <img src={ drinkIcon } alt="drink" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button">
          <img
            src={ exploreIcon }
            alt="explore"
            data-testid="explore-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
          onClick={ () => getRecipes(
            'https://www.themealdb.com/api/json/v1/1/search.php?s=',
            'meals',
          ) }
        >
          <img src={ mealIcon } alt="drink" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getRecipes: (endpoint, type) => dispatch(getRecipesThunk(endpoint, type)),
});

Footer.propTypes = {
  getRecipes: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Footer);
