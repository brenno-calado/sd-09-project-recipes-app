import React from 'react';
import PropTypes from 'prop-types';
import { getPageFromURL } from '../../services/others';

function InProgressHeaderDetails({ detailsContext }) {
  const { recipe } = detailsContext;

  const renderRecipePhoto = () => (
    getPageFromURL()
      ? (
        <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="img" />
      )
      : (
        <img data-testid="recipe-photo" src={ recipe.strDrinkThumb } alt="img" />
      )
  );

  const renderRecipeTitle = () => (
    getPageFromURL()
      ? (
        <h2 data-testid="recipe-title" className="detail-img">
          {recipe.strMeal}
        </h2>
      )
      : (
        <h2 data-testid="recipe-title" className="detail-img">
          {recipe.strDrink}
        </h2>
      )
  );

  const renderRecipeCategory = () => (
    getPageFromURL() ? (
      <p data-testid="recipe-category">{recipe.strCategory}</p>)
      : (<p data-testid="recipe-category">{recipe.strAlcoholic}</p>)
  );

  return (
    <>
      { renderRecipePhoto() }
      { renderRecipeTitle() }
      { renderRecipeCategory() }
    </>
  );
}

InProgressHeaderDetails.propTypes = {
  data: PropTypes.object,
}.isRequired;

export default InProgressHeaderDetails;
