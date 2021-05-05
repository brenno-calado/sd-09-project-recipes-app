import React from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function RecipeHeader({ path, url, recipe, id }) {
  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb || recipe.strMealThumb }
        alt={ recipe.strDrink || recipe.strMeal }
      />
      <h3 data-testid="recipe-title">{recipe.strDrink || recipe.strMeal}</h3>
      <h5
        data-testid="recipe-category"
      >
        {(path.includes('bebidas') && recipe.strAlcoholic) || recipe.strCategory}
      </h5>
      <ShareButton url={ url } />
      <FavoriteButton recipe={ recipe } id={ id } />
    </>
  );
}

RecipeHeader.propTypes = {
  recipe: PropTypes.objectOf(''),
}.isRequired;

export default RecipeHeader;
