import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetails(props) {
  const { recipe } = props;
  const ingredients = recipe.filter((recipe.includes('ingredient')));
  return (
    <div>
      <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="recipeImg" />
      <div>
        <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
        <h5 data-testid="recipe-category">
          Category:
          { recipe.srtCategory }
        </h5>
        <button data-testid="share-btn" type="button">Share</button>
        <button data-testid="favorite-btn" type="button">♡</button>
      </div>
      <div>
        <h4>Instructions</h4>
        <p data-testid="instructions">{ recipe.srtInstructions }</p>
      </div>
      <div>
        <h4>Ingredients</h4>
        <ul>
          { ingredients.forEach((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
              -
              { recipe.srtMeasure`${index + 1}`}
            </li>)) }
        </ul>
      </div>
      <div>
        <h4>Vídeo</h4>
        <video
          data-testid="video"
          controls
          width="200px"
          height="150px"
          src={ recipe.srtSource }
        >
          <track
            default
            kind="captions"
            src=""
          />
          Sorry, your browser does not support embedded videos.
        </video>
      </div>
      <div>
        <h4>Receitas Recomendadas</h4>
        {/* data-testid=`${index}-recomendation-card` */}
      </div>
      <button data-testid="start-recipe-btn" type="button">Start Recipe</button>
    </div>
  );
}

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    filter: PropTypes.func,
    includes: PropTypes.func,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    srtCategory: PropTypes.string,
    srtInstructions: PropTypes.string,
    srtSource: PropTypes.string,
    srtMeasure: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
