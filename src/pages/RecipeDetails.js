import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMealsById } from '../services/index';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails() {
  const [isFavorite, setFavorite] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [currentMeal, setCurrentMeal] = useState({});
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strInstructions,
    strYoutube,
  } = currentMeal;
  const recipeId = useParams();
  // const currentMeal = Promise.resolve(fetchMealsById(recipeId.id));

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const retrievedRecipe = await fetchMealsById(recipeId.id);
      setCurrentMeal(retrievedRecipe[0]);
      setFetching(false);
    };
    fetchRecipeDetails();
  }, [recipeId.id]);

  const filterIngredients = () => {
    const recipeIngredients = Object
      .entries(currentMeal).filter((key) => (
        key[0].includes('Ingredient') && key[1] !== '' && key[1] !== null
      ));
    const recipeIngredientsMeasures = Object
      .entries(currentMeal).filter((key) => (
        key[0].includes('Measure') && key[1] !== '' && key[1] !== null
      ));

    const recipeIngredientsAndMeasures = [];
    recipeIngredients.forEach((ingr, index) => {
      recipeIngredientsAndMeasures
        .push(`${ingr[1]}: ${recipeIngredientsMeasures[index][1]}`);
    });
    return recipeIngredientsAndMeasures
      .map((item, index) => (
        <li
          key={ item }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          { item }
        </li>
      ));
  };

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
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress === null || !recipesInProgress
      .some((item) => item.idMeal === recipeId.id)) {
      const setRecipesInProgress = [];
      setRecipesInProgress.push(currentMeal);
      localStorage.setItem('inProgressRecipes', JSON.stringify(setRecipesInProgress));
    }
  };

  const renderRecipeDetails = () => (
    <div className="recipe-details">
      <img
        className="recipe-image"
        src={ strMealThumb }
        alt="Receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <div>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="compartilhar" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => setFavorite(!isFavorite) }
        >
          <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="Favorite" />
        </button>
      </div>
      <h2 data-testid="recipe-category">{`Categoria: ${strCategory}`}</h2>
      <ul>
        { filterIngredients() }
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      <section data-testid="video">{ renderVideoThumb(strYoutube) }</section>
      <Link to={ `${recipeId.id}/in-progress` }>
        <button
          className="start-recipe"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => startRecipe() }
        >
          Iniciar Receita
        </button>
      </Link>
      <section data-testid="0-recomendation-card">Recomendações</section>
    </div>
  );

  return (
    isFetching === false ? renderRecipeDetails() : <h1>Loading...</h1>
  );
}

export default RecipeDetails;
