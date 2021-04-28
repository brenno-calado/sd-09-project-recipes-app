import React, { useEffect, useState } from 'react';

function MealDetails({ match: { params: { id } } }) {

  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  
  async function fetchRecipe() {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const fetchResponse = await fetch(endpoint);
    const jsonRecipe = await fetchResponse.json();
    setRecipe(jsonRecipe.meals[0]);
    setLoading(false);
  }

  useEffect(() => fetchRecipe(), [])

  function renderRecipePhoto() {
    return (
      <img
        src={ recipe.strMealThumb }
        style={ { width: 300 } } // tirar depois
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
        data-testid="share-btn"
      >
        Compartilhar
      </button>
    );
  }

  function renderFavoriteButton() {
    return (
      <button
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
    );
  }

  function filterIngredients() {
    const recipeKeys = Object.keys(recipe);
    const recipeIngredientKeys = recipeKeys.filter((propriety) => (
      propriety.includes('strIngredient'))
    );
    return recipeIngredientKeys.filter((ingredientKey) => (
      recipe[ingredientKey] !== '' && recipe[ingredientKey] !== null
    )).map((ingredintsKeys) => (
      recipe[ingredintsKeys]
    ))
  }

  function filterMeasures() {
    const measureKeys = Object.keys(recipe);
    const measureIngredientKeys = measureKeys.filter((propriety) => (
      propriety.includes('strMeasure'))
    );
    return measureIngredientKeys.filter((measureKey) => (
      recipe[measureKey] !== '' && recipe[measureKey] !== null
    )).map((measureKey) => (
      recipe[measureKey]
    ))
  }

  function renderRecipeIngredients() {
    const ingredientsList = filterIngredients();
    const measureList = filterMeasures();
    return (
      <div>
        <h4>Lista de Ingredientes</h4>
        <ul>
          { ingredientsList.map((ingredient, index) => {
            return (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient }
              >
                { `${ ingredient } (${ measureList[index] })` }
              </li>
            );
          }) }
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
    >

    </div>
  );
}

  function renderStartRecipeButton() {
    return (
      <button
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </button>
    );
  }

  if (loading) return <h1>Loading...</h1>
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
}.isRequired

export default MealDetails;
