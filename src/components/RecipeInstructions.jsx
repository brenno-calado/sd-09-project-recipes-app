import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeInstructions({ type, page }) {
  const { mealId, drinkId } = useContext(RecipesAppContext);
  const recipe = (type === 'Meal') ? mealId : drinkId;
  return (
    <div className="instructions-container">
      <h4>Instructions</h4>
      <p data-testid="instructions" className="instructions">
        { recipe.strInstructions }
      </p>
      { ((page === 'details') && (type === 'Meal')) && (
        <ReactPlayer
          url={ recipe.strYoutube }
          data-testid="video"
          width="100%"
          height="250px"
        />
      ) }
    </div>
  );
}

RecipeInstructions.propTypes = {
  type: PropTypes.string,
  page: PropTypes.string,
}.isRequired;

export default RecipeInstructions;
