import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendFavoriteRecipes } from '../redux/actions';
import FavoriteRecipesFilters from '../components/FavoriteRecipesFilters';
import FavoriteRecipesCards from '../components/FavoriteRecipesCards';

function FavoriteRecipes({ favoriteRecipesDispatcher }) {
  const getFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favoriteRecipesDispatcher(favoriteRecipes);
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, []);

  return (
    <div>
      <h1>Receitas Favoritas</h1>
      <FavoriteRecipesFilters />
      <FavoriteRecipesCards />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  favoriteRecipesDispatcher: (recipe) => dispatch(sendFavoriteRecipes(recipe)),
});

FavoriteRecipes.propTypes = {
  favoriteRecipesDispatcher: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FavoriteRecipes);
