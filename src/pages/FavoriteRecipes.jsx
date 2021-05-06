import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendFavoriteRecipes } from '../redux/actions';
import FavoriteRecipesFilters from '../components/FavoriteRecipesFilters';
import FavoriteRecipesCards from '../components/FavoriteRecipesCards';
import Header from '../components/Header';

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
      <Header title="Receitas Favoritas" />
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
