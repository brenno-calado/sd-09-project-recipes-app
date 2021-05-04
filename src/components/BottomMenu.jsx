import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../css/components/BottomMenu.css';
import { clearList, recipeCase, recipeQuery, recipeType } from '../actions';

function BottomMenu({ deleteRecipesList, setRecipeType, setRecipeQuery, setRecipeCase }) {
  const handleClick = (type, query, searchBy) => {
    deleteRecipesList();
    setRecipeType(type);
    setRecipeQuery(query);
    setRecipeCase(searchBy);
  };

  return (
    <footer className="footer" data-testid="footer">
      <Link to="/bebidas">
        <button
          type="button"
          className="btn-footer"
          onClick={ () => handleClick('cocktail', null, null) }
        >
          <img
            src={ drinkIcon }
            alt="Drink Icon"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/explorar">
        <button
          type="button"
          className="btn-footer"
        >
          <img src={ exploreIcon } alt="Explore Icon" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          type="button"
          className="btn-footer"
          onClick={ () => handleClick('meal', null, null) }
        >
          <img src={ mealIcon } alt="Meal Icon" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

const mapDispatchToProps = (dispatch) => ({
  deleteRecipesList: () => dispatch(clearList()),
  setRecipeType: (type) => dispatch(recipeType(type)),
  setRecipeQuery: (query) => dispatch(recipeQuery(query)),
  setRecipeCase: (searchBy) => dispatch(recipeCase(searchBy)),
});

BottomMenu.propTypes = {
  deleteRecipesList: PropTypes.func,
  setRecipeType: PropTypes.func,
  setRecipeQuery: PropTypes.func,
  setRecipeCase: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(BottomMenu);
