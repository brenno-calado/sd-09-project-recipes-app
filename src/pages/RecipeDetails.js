import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  fetchMealsById,
  setFavoritesStorage,
  setInProgressStorage,
  setDoneStorage } from '../services/index';
import {
  filterIngredients,
  saveMealAsFavorite,
  checkRecipesInProgress,
  checkDoneRecipes } from '../services/recipes';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails() {
  const [isFavorite, setFavorite] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [currentMeal, setCurrentMeal] = useState({});
  const [urlCopied, setUrlCopied] = useState('');
  const [prepareRecipe, setPrepare] = useState('Iniciar receita');

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strYoutube,
  } = currentMeal;
  const recipeId = useParams();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const retrievedRecipe = await fetchMealsById(recipeId.id);
      setCurrentMeal(retrievedRecipe[0]);
      setFetching(false);
    };
    const checkFavorites = (id) => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes.some((recipe) => recipe.id === id)) setFavorite(true);
    };
    const checkInProgress = (id) => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const recipesInProgress = Object.entries(inProgressRecipes.meals);
      if (recipesInProgress
        .some((item) => item[0] === id)) setPrepare('Continuar Receita');
    };
    setDoneStorage();
    setFavoritesStorage();
    setInProgressStorage();
    fetchRecipeDetails();
    checkInProgress(recipeId.id);
    checkFavorites(recipeId.id);
  }, [recipeId.id]);

  const renderIngredientsList = (list) => (
    list.map((item, index) => (
      <li
        key={ item }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { item }
      </li>
    ))
  );

  const renderVideoThumb = (url) => {
    if (url !== undefined) {
      const recipeUrl = url.split('=')[1];
      return (
        <iframe
          width="340"
          height="400"
          src={ `https://www.youtube.com/embed/${recipeUrl}` }
          title={ strMeal }
        />);
    }
  };

  const startRecipe = () => {
    checkRecipesInProgress(recipeId.id, 'meals', filterIngredients(currentMeal));
  };

  const saveAsFavorite = () => {
    setFavorite(!isFavorite);
    saveMealAsFavorite(recipeId.id, currentMeal);
  };

  const onCopyText = () => {
    const timeout = 1000;
    setUrlCopied('Link copiado!');
    setTimeout(() => {
      setUrlCopied('');
    }, timeout);
  };

  const copyToClipBoard = async () => {
    onCopyText();
    await navigator.clipboard
      .writeText(`http://localhost:3000/comidas/${recipeId.id}`);
  };

  const renderStartButton = () => (
    <Link to={ `${recipeId.id}/in-progress` }>
      <button
        className={ checkDoneRecipes(recipeId.id) ? 'hide-start-btn' : 'start-recipe' }
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => startRecipe() }
      >
        { prepareRecipe }
      </button>
    </Link>
  );

  const renderRecipeDetails = () => (
    <div className="recipe-details">
      <img
        className="recipe-image"
        src={ strMealThumb }
        alt="Receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <div id="shareAndFavorite">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => copyToClipBoard() }
        >
          <img src={ shareIcon } alt="compartilhar" />
        </button>
        <button
          type="button"
          onClick={ () => saveAsFavorite() }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite"
          />
        </button>
        <span>{ urlCopied }</span>
      </div>
      <h2 data-testid="recipe-category">{`Categoria: ${strCategory}`}</h2>
      <ul>
        { renderIngredientsList(filterIngredients(currentMeal)) }
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      <section data-testid="video">{ renderVideoThumb(strYoutube) }</section>
      { renderStartButton() }
      <section data-testid="0-recomendation-card">Recomendações</section>
    </div>
  );

  return (
    isFetching === false ? renderRecipeDetails() : <h1>Loading...</h1>
  );
}

export default RecipeDetails;
