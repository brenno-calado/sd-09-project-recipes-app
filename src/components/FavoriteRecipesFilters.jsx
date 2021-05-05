import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendFavoriteRecipes } from '../redux/actions';

function FavoriteRecipesFilters({ sendRecipesDispatcher }) {
  const sendAll = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    sendRecipesDispatcher(favoriteRecipes);
  };

  const sendDrinks = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredRecipes = favoriteRecipes
      .filter((recipe) => recipe.type === 'bebida');
    sendRecipesDispatcher(filteredRecipes);
  };

  const sendFoods = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredRecipes = favoriteRecipes
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
  sendRecipesDispatcher: (recipes) => dispatch(sendFavoriteRecipes(recipes)),
});

FavoriteRecipesFilters.propTypes = {
  sendRecipesDispatcher: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FavoriteRecipesFilters);
