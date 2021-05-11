import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Loading from '../components/Loading';
import { checkIfDoneRecipe, getRecipeInProgress } from '../services/storage';
import { fetchApi } from '../services/api';

const RecipeDetails = ({ match: { path, params } }) => {
  const { id } = params;
  const history = useHistory();
  const [isFetchingDetails, setFetchingDetails] = useState(true);
  const [isFetchingRecommendations, setFetchingRecommendations] = useState(true);
  const [details, setDetails] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const isRecipeDone = checkIfDoneRecipe(details);
  const isRecipeInProgress = getRecipeInProgress(details);
  const isFoodsPage = path.includes('comida');

  const buttonStyle = {
    position: 'fixed',
    right: 30,
    bottom: 0,
  };

  const renderIngredients = () => {
    const ingredients = Object.keys(details)
      .filter((key) => (
        key.includes('Ingredient') && details[key]))
      .map((key, index) => {
        const ingredientName = details[key];
        const ingredientMeasure = details[`strMeasure${index + 1}`];
        return (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredientName} - ${ingredientMeasure}`}
          </li>
        );
      });
    return ingredients;
  };

  const renderRecommended = () => {
    if (recommendation) {
      const max = 6;
      const recommendationData = recommendation.slice(0, max);
      return recommendationData.map((recipe, index) => (
        <Carousel.Item
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            width="100%"
            alt="Recommendation"
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
          />
          <Carousel.Caption>
            <p data-testid={ `${index}-recomendation-title` }>
              { recipe.strDrink || recipe.strMeal }
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ));
    }
  };

  const handleStartRecipeClick = () => {
    if (isFoodsPage) {
      return history.push(`/comidas/${id}/in-progress`);
    }
    return history.push(`/bebidas/${id}/in-progress`);
  };

  const fetchData = async (paramsObj) => {
    const fetchDetails = await fetchApi(paramsObj);
    const key = Object.keys(fetchDetails)[0];
    return fetchDetails[key];
  };

  useEffect(() => {
    fetchData({ i: id, isDetails: true, isFoodsPage })
      .then((recipeResponse) => {
        setDetails(recipeResponse['0']);
        setFetchingDetails(false);
      });
    fetchData({ s: '', isFoodsPage: !isFoodsPage })
      .then((recipeResponse) => {
        setRecommendation(recipeResponse);
        setFetchingRecommendations(false);
      });
  }, []);

  if (isFetchingDetails || isFetchingRecommendations) return <Loading />;

  return (
    <div>
      <img
        width="100%"
        src={ details.strMealThumb || details.strDrinkThumb }
        alt="imagem-da-receita"
        data-testid="recipe-photo"
      />

      <FavoriteButton recipe={ details } testId="favorite-btn" />
      <ShareButton isFoodPage={ isFoodsPage } recipeId={ id } testId="share-btn" />

      <h1
        style={ { textAlign: 'center' } }
        data-testid="recipe-title"
      >
        { details.strDrink || details.strMeal }

      </h1>
      <h4 data-testid="recipe-category">{details.strAlcoholic || details.strCategory}</h4>
      <h5>Ingredients</h5>
      <ul>
        { renderIngredients() }
      </ul>
      <p data-testid="instructions">{details.strInstructions}</p>
      <ReactPlayer
        url={ details.strYoutube }
        width="100%"
        data-testid="video"
      />
      <h4>Recommended</h4>
      <Carousel>
        { renderRecommended() }
      </Carousel>
      { !isRecipeDone && (
        <button
          type="button"
          style={ buttonStyle }
          data-testid="start-recipe-btn"
          onClick={ () => handleStartRecipeClick() }
        >
          { (isRecipeInProgress && 'Continuar ') || 'Iniciar ' }
          Receita
        </button>
      ) }
    </div>
  );
};

export default RecipeDetails;

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
