import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendDoneRecipes } from '../redux/actions';

function DoneRecipesFilters({ sendRecipesDispatcher }) {
  const sendAll = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    sendRecipesDispatcher(doneRecipes);
  };

  const sendDrinks = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const filteredRecipes = doneRecipes
      .filter((recipe) => recipe.type === 'bebida');
    sendRecipesDispatcher(filteredRecipes);
  };

  const sendFoods = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const filteredRecipes = doneRecipes
      .filter((recipe) => recipe.type === 'comida');
    sendRecipesDispatcher(filteredRecipes);
  };

  return (
    <section>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ sendAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ sendFoods }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ sendDrinks }
      >
        Drinks
      </button>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  sendRecipesDispatcher: (recipes) => dispatch(sendDoneRecipes(recipes)),
});

DoneRecipesFilters.propTypes = {
  sendRecipesDispatcher: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(DoneRecipesFilters);
