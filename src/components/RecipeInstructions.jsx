import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeInstructions({ type }) {
  const { mealId, drinkId } = useContext(RecipesAppContext);
  const recipe = (type === 'Meal') ? mealId : drinkId;
  return (
    <p data-testid="instructions" className="instructions">
      { recipe.strInstructions }
    </p>
  );
}

RecipeInstructions.propTypes = {
  type: PropTypes.string,
}.isRequired;

export default RecipeInstructions;
