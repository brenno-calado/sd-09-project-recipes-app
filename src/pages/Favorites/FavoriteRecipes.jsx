import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../../common/components/Header';
import RecipesContext from '../../context/RecipesContext';
import DoneFavRecipeCard from '../../common/components/DoneFavRecipeCard';
import DoneFavButtons from '../../common/components/buttons/DoneFavButtons';

function FavoriteRecipes({ history }) {
  const { doneFav, resetFilter } = useContext(RecipesContext);

  useEffect(() => {
    resetFilter('favoriteRecipes');
  }, [resetFilter]);

  // useEffect(() => {
  //   function verifyFavorite(id) {
  //     const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  //     const isFav = favorites.find((item) => item.id === id);
  //     setFavorite(isFav);
  //   }
  //   if (doneFav) { doneFav.map((recipe) => verifyFavorite(recipe.id)); }
  // }, [setFavorite, doneFav]);

  return (
    <div>
      <Header title="Receitas Favoritas" isSearchEnable={ false } />
      <DoneFavButtons type="favoriteRecipes" />
      { doneFav && doneFav.map((recipe, index) => (
        <DoneFavRecipeCard
          history={ history }
          index={ index }
          recipe={ recipe }
          key={ recipe.id }
          favOrDone="fav"
        />))}
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FavoriteRecipes;
