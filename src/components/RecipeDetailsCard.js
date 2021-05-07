import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import ReactPlayer from 'react-player';
import { getRecipeAndParseById } from '../services/api';
import FavoriteRecipeButton from './FavoriteRecipeButton';
import ShareRecipeButton from './ShareRecipeButton';
import RecomendationList from './RecomendationsList.js';
import ButtonStartOrContinueRecipe from './ButtonStartOrContinueRecipe';

function RecipesDetailsCard({ isMeal }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getRecipeAndParseById(id, isMeal).then((recipeItem) => {
      setRecipeDetails({
        ...recipeItem,
        alcoholicOrNot: recipeItem.alcoholic ? 'Alcoholic' : '',
      });
    });
  }, [id, isMeal]);

  const renderIngredientsAndMeasure = () => recipeDetails.ingredients
    .map(({ ingredient, measure }, index) => (
      <li
        key={ ingredient }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { `${ingredient} - ${measure}` }
      </li>
    ));

  if (!recipeDetails) return <p>Loading...</p>;

  return (
    <section className="d-flex flex-column mb-5">
      <img
        src={ recipeDetails.image }
        alt="Foto da receita"
        data-testid="recipe-photo"
        width="300"
      />
      <h2 data-testid="recipe-title">{ recipeDetails.name }</h2>
      <ShareRecipeButton dataTestid="share-btn" isMeal={ isMeal } recipeId={ id } />
      <FavoriteRecipeButton recipe={ recipeDetails } />
      <h3 data-testid="recipe-category">
        {isMeal ? recipeDetails.category : recipeDetails.alcoholic}
      </h3>
      <h4>Ingredientes</h4>
      <ul>{renderIngredientsAndMeasure()}</ul>
      <h4>Instruções</h4>
      <p data-testid="instructions">{recipeDetails.instructions}</p>
      <div data-testid="video">
        {isMeal && <ReactPlayer url={ recipeDetails.video } />}
      </div>
      <h4>Recomendadas</h4>
      <RecomendationList isMeal={ !isMeal } />
      <ButtonStartOrContinueRecipe isMeal={ isMeal } id={ id } />
    </section>
  );
}

RecipesDetailsCard.propTypes = {
  isMeal: PropTypes.bool.isRequired,
};

export default RecipesDetailsCard;
