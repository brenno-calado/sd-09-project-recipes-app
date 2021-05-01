import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../App.css';

function DrinkDetails({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnVisibility, setVisibility] = useState('block');

  useEffect(() => {
    async function fetchRecipe() {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const fetchResponse = await fetch(endpoint);
      const jsonRecipe = await fetchResponse.json();
      setRecipe(jsonRecipe.drinks[0]);
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
        src={ recipe.strDrinkThumb }
        data-testid="recipe-photo"
        alt="Foto do prato"
        tagName="IMG"
      />
    );
  }

  function renderRecipeTitle() {
    return (
      <div>
        <h2
          data-testid="recipe-title"
        >
          { recipe.strDrink }
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
          {recipe.strAlcoholic}
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
      recipe[ingredientKey] !== null && recipe[ingredientKey] !== ''
    )).map((ingredintsKeys) => (
      recipe[ingredintsKeys]
    ));
  }

  function filterMeasures() {
    const measureKeys = Object.keys(recipe);
    const measureIngredientKeys = measureKeys.filter((propriety) => (
      propriety.includes('strMeasure')));
    return measureIngredientKeys.filter((measureKey) => (
      recipe[measureKey] !== null && recipe[measureKey] !== ''
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
              { `${ingredient} (${measureList[index] ? measureList[index] : ''})` }
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

  function renderRecomendedRecipes() {
    return (
      <div
        data-testid="0-recomendation-card"
      />
    );
  }

  function renderStartRecipeButton() {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        style={ { display: btnVisibility } }
      >
        Iniciar receita
      </button>
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
      { renderRecomendedRecipes() }
      { renderStartRecipeButton() }
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default DrinkDetails;
