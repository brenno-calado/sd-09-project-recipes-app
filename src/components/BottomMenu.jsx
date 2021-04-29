import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../css/components/BottomMenu.css';
import { clearList } from '../actions';

function BottomMenu({ deleteRecipesList }) {
  const handleClick = () => {
    deleteRecipesList();
  };

  return (
    <footer className="footer" data-testid="footer">
      <Link to="/bebidas">
        <button
          type="button"
          className="btn-footer"
          onClick={ handleClick }
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
          onClick={ handleClick }
        >
          <img src={ mealIcon } alt="Meal Icon" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

const mapDispatchToProps = (dispatch) => ({
  deleteRecipesList: () => dispatch(clearList()),
});

BottomMenu.propTypes = {
  deleteRecipesList: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(BottomMenu);
