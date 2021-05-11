import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeDetailsHeader({ type }) {
  const { mealId, drinkId } = useContext(RecipesAppContext);
  const recipe = (type === 'Meal') ? mealId : drinkId;
  return (
    <>
      <img
        data-testid="recipe-photo"
        className="recipe-photo"
        alt={ recipe[`str${type}`] }
        src={ recipe[`str${type}Thumb`] }
      />
      <h3 data-testid="recipe-title" className="recipe-title">
        { recipe[`str${type}`] }
      </h3>
      <p data-testid="recipe-category">
        { (type === 'Meal') ? recipe.strCategory : recipe.strAlcoholic }
      </p>
    </>
  );
}

RecipeDetailsHeader.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default RecipeDetailsHeader;
