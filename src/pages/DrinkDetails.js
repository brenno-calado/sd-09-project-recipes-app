import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  fetchDrinkById,
  setFavoritesStorage,
  setInProgressStorage,
  setDoneStorage } from '../services/index';
import {
  filterIngredients,
  saveDrinkAsFavorite,
  checkRecipesInProgress,
  checkDoneRecipes } from '../services/recipes';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DrinkDetails() {
  const [isFavorite, setFavorite] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [currentDrink, setCurrentDrink] = useState({});
  const [urlCopied, setUrlCopied] = useState('');
  const [prepareRecipe, setPrepare] = useState('Iniciar receita');
  const {
    strDrink,
    strDrinkThumb,
    strInstructions,
    strAlcoholic,
  } = currentDrink;
  const recipeId = useParams();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const retrievedRecipe = await fetchDrinkById(recipeId.id);
      setCurrentDrink(retrievedRecipe[0]);
      setFetching(false);
    };
    const checkFavorites = (id) => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes.some((recipe) => recipe.id === id)) setFavorite(true);
    };
    const checkInProgress = (id) => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const recipesInProgress = Object.entries(inProgressRecipes.cocktails);
      if (recipesInProgress
        .some((item) => item[0] === id)) setPrepare('Continuar Receita');
    };
    setDoneStorage();
    setFavoritesStorage();
    setInProgressStorage();
    fetchRecipeDetails();
    checkInProgress(recipeId.id);
    checkFavorites(recipeId.id);
  }, [recipeId.id, prepareRecipe]);

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

  const startRecipe = () => {
    checkRecipesInProgress(recipeId.id, 'cocktails', filterIngredients(currentDrink));
  };

  const saveAsFavorite = () => {
    setFavorite(!isFavorite);
    saveDrinkAsFavorite(recipeId.id, currentDrink);
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
      .writeText(`http://localhost:3000/bebidas/${recipeId.id}`);
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
        src={ strDrinkThumb }
        alt="Receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ strDrink }</h1>
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
      <h2 data-testid="recipe-category">{strAlcoholic}</h2>
      <ul>
        { renderIngredientsList(filterIngredients(currentDrink)) }
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      { renderStartButton() }
      <section data-testid="0-recomendation-card">Recomendações</section>
    </div>
  );

  return (
    isFetching === false ? renderRecipeDetails() : <h1>Loading...</h1>
  );
}

export default DrinkDetails;
