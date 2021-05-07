import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Carousel from 'react-elastic-carousel';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Footer from '../components/Footer';
import RecommendedCard from '../components/RecommendedCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const RecipeDetails = ({ match: { path, params } }) => {
  const { id } = params;
  const history = useHistory();
  const [details, setDetails] = useState('');
  const [recommendedRecipes, setRecommendedRecipes] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const isFoodsPage = path.includes('comida');
  const isDrinksPage = path.includes('bebidas');
  const foodUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const recommendedFoodUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const recommendedDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const getClipBoard = () => {
    if (isFoodsPage) {
      return `http://localhost:3000/comidas/${id}`;
    }
    if (isDrinksPage) {
      return `http://localhost:3000/bebidas/${id}`;
    }
  };

  const clipBoard = getClipBoard();

  const breakPoints = [
    { width: 360, itemsToShow: 2 },
    { width: 640, itemsToShow: 2 },
  ];
  const buttonStyle = {
    position: 'fixed',
    right: 30,
    bottom: 0,
  };

  const renderIngredients = () => {
    const ingredients = Object.keys(details)
      .filter((key) => (
        key.includes('Ingredient') && details[key]))
      .map((key, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${details[key]} - ${details[`strMeasure${index + 1}`]}`}
        </li>
      ));
    return ingredients;
  };

  const renderRecommended = () => {
    if (recommendedRecipes) {
      const max = 6;
      const recommended = recommendedRecipes.drinks || recommendedRecipes.meals;
      const recommendation = recommended.slice(0, max);
      return recommendation
        .map((elem, index) => (
          <RecommendedCard key={ index } recipe={ elem } index={ index } />));
    }
  };

  const handleStartRecipeClick = () => {
    if (isFoodsPage) {
      return history.push(`/comidas/${id}/in-progress`);
    }
    if (isDrinksPage) {
      return history.push(`/bebidas/${id}/in-progress`);
    }
  };

  const handleHeartIcon = () => {
    if (isFavorited === false) {
      return (
        <button
          onClick={ () => setIsFavorited(true) }
          type="button"

        >
          <img
            src={ whiteHeartIcon }
            alt="white-heart-icon"
            data-testid="favorite-btn"
          />
        </button>
      );
    }
    if (isFavorited === true) {
      return (
        <button
          onClick={ () => setIsFavorited(false) }
          type="button"
        >
          <img
            src={ blackHeartIcon }
            alt="black-heart-icon"
            data-testid="favorite-btn"
          />
        </button>
      );
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      if (isFoodsPage) {
        const response = await fetch(foodUrl);
        const data = await response.json();
        const food = data.meals[0];
        setDetails(food);
        const recommendedResponse = await fetch(recommendedDrinkUrl);
        const recommendedData = await recommendedResponse.json();
        setRecommendedRecipes(recommendedData);
      }
      if (isDrinksPage) {
        const response = await fetch(drinkUrl);
        const drinkData = await response.json();
        const drink = drinkData.drinks[0];
        setDetails(drink);
        const recommendedResponse = await fetch(recommendedFoodUrl);
        const recommendedData = await recommendedResponse.json();
        setRecommendedRecipes(recommendedData);
      }
    };
    fetchRecipe();
  }, [drinkUrl, foodUrl, isDrinksPage, isFoodsPage]);

  return (
    <div>
      <img
        width="100%"
        src={ details.strMealThumb || details.strDrinkThumb }
        alt="imagem-da-receita"
        data-testid="recipe-photo"
      />
      <CopyToClipboard text={ clipBoard }>
        <button
          type="button"
          onClick={ () => setIsLinkCopied(true) }
        >
          <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
        </button>
      </CopyToClipboard>
      <div>
        {handleHeartIcon()}
        {isLinkCopied && <div>Link copiado!</div>}
      </div>
      <h1
        style={ { textAlign: 'center' } }
        data-testid="recipe-title"
      >
        {details.strDrink || details.strMeal}

      </h1>
      <h4 data-testid="recipe-category">{details.strAlcoholic || details.strCategory}</h4>
      <h5>Ingredients</h5>
      <ul>
        {renderIngredients()}
      </ul>
      <p data-testid="instructions">{details.strInstructions}</p>
      <ReactPlayer
        url={ details.strYoutube }
        width="100%"
        data-testid="video"
      />
      <h4>Recommended</h4>
      <Carousel breakPoints={ breakPoints }>

        {renderRecommended()}

      </Carousel>
      <button
        type="button"
        style={ buttonStyle }
        data-testid="start-recipe-btn"
        onClick={ () => handleStartRecipeClick() }
      >
        Iniciar Receita

      </button>
      <div>
        <Footer />
      </div>
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
