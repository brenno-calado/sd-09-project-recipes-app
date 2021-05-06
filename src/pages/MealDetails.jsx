import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import '../App.css';

function MealDetails({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnVisibility, setVisibility] = useState('block');

  useEffect(() => {
    async function fetchRecipe() {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const fetchResponse = await fetch(endpoint);
      const jsonRecipe = await fetchResponse.json();
      console.log(setRecipe(jsonRecipe.meals[0]));
      setLoading(false);
    }
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    function handleDoneRecipes() {
      const doneRecipesJSON = localStorage.getItem('doneRecipes');
      const doneRecipesList = JSON.parse(doneRecipesJSON);
      if (doneRecipesList !== null) {
        const isDone = doneRecipesList.find((doneRecipe) => doneRecipe.id === id);
        if (isDone) {
          setVisibility('none');
        }
      }
    }
    handleDoneRecipes();
  }, [id]);

  function renderRecipePhoto() {
    return (
      <img
        className="recipe-image"
        src={ recipe.strMealThumb }
        data-testid="recipe-photo"
        alt="Foto do prato"
      />
    );
  }

  function renderRecipeTitle() {
    return (
      <div>
        <h2
          data-testid="recipe-title"
        >
          { recipe.strMeal }
        </h2>
      </div>

    );
  }

  function renderRecipeCategory() {
    return (
      <div>
        <h5
          data-testid="recipe-category"
        >
          {recipe.strCategory}
        </h5>
      </div>

    );
  }

  function renderShareButton() {
    return (
      <button
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
    );
  }

  function renderFavoriteButton() {
    return (
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
    );
  }

  function filterIngredients() {
    const recipeKeys = Object.keys(recipe);
    const recipeIngredientKeys = recipeKeys.filter((propriety) => (
      propriety.includes('strIngredient')));
    return recipeIngredientKeys.filter((ingredientKey) => (
      recipe[ingredientKey] !== '' && recipe[ingredientKey] !== null
    )).map((ingredintsKeys) => (
      recipe[ingredintsKeys]
    ));
  }

  function filterMeasures() {
    const measureKeys = Object.keys(recipe);
    const measureIngredientKeys = measureKeys.filter((propriety) => (
      propriety.includes('strMeasure')));
    return measureIngredientKeys.filter((measureKey) => (
      recipe[measureKey] !== '' && recipe[measureKey] !== null
    )).map((measureKey) => (
      recipe[measureKey]
    ));
  }

  function renderRecipeIngredients() {
    const ingredientsList = filterIngredients();
    const measureList = filterMeasures();
    return (
      <div>
        <h4>Lista de Ingredientes</h4>
        <ul>
          { ingredientsList.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient }
            >
              { `${ingredient} (${measureList[index]})` }
            </li>
          ))}
        </ul>
      </div>

    );
  }

  function renderRecipeInstructions() {
    return (
      <div>
        <h3>Modo de preparo:</h3>
        <p
          data-testid="instructions"
        >
          { recipe.strInstructions }
        </p>
      </div>
    );
  }

  function renderRecipeVideo() {
    return (
      <iframe
        title="video"
        width="300"
        height="300"
        src={ recipe.strYoutube }
        data-testid="video"
      />
    );
  }

  function renderRecomendedRecipes() {
    return (
      <div
        data-testid="0-recomendation-card"
      />
    );
  }

  function renderStartRecipeButton() {
    return (
      <Link to={ `/comidas/${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          style={ { display: btnVisibility } }
        >
          Iniciar receita
        </button>
      </Link>
    );
  }

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      { renderRecipePhoto() }
      { renderRecipeTitle() }
      { renderRecipeCategory() }
      { renderShareButton() }
      { renderFavoriteButton() }
      { renderRecipeIngredients() }
      { renderRecipeInstructions() }
      { renderRecipeVideo() }
      { renderRecomendedRecipes() }
      { renderStartRecipeButton() }
    </div>
  );
}

MealDetails.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default MealDetails;
