import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';
import ReactPlayer from 'react-player';
import { getRecipeAndParseById } from '../services/api';
import RecomendationList from './RecomedationsList';
import FavoriteRecipeButton from './FavoriteRecipeButton';
import ShareRecipeButton from './ShareRecipeButton';

function RecipesDetailsCard({ isMeal }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { id } = useParams();

  const history = useHistory();

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
    <section>
      <img
        src={ recipeDetails.image }
        alt="Foto da receita"
        data-testid="recipe-photo"
        width="300"
      />
      <h2 data-testid="recipe-title">{ recipeDetails.name }</h2>
      <ShareRecipeButton />
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
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="fixed-bottom btn btn-primary btn-block"
        onClick={ () => history
          .push(`/${isMeal ? 'comidas' : 'bebidas'}/${id}/in-progress`) }
      >
        Iniciar receita
      </button>
    </section>
  );
}

RecipesDetailsCard.propTypes = {
  isMeal: PropTypes.bool.isRequired,
};

export default RecipesDetailsCard;
