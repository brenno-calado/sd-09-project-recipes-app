import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecomendedDinks from '../components/RecomendedDrinks';
import '../App.css';

const MealDetails = ({ match: { params: { id } } }) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        setRecipe(result.meals[0]);
      } catch (error) {
        return Error(error);
      }
    };
    fetchRecipe();
  }, [id]);

  const renderRecipePhoto = () => (
    <img
      style={ { width: 30, height: 30 } }
      src={ recipe.strMealThumb }
      data-testid="recipe-photo"
      alt="Foto do prato"
      tagName="IMG"
    />
  );

  const renderRecipeTitle = () => (
    <div>
      <h2
        data-testid="recipe-title"
      >
        { recipe.strMeal }
      </h2>
    </div>

  );

  const renderRecipeCategory = () => (
    <div>
      <h5
        data-testid="recipe-category"
      >
        {recipe.strCategory}
      </h5>
    </div>

  );

  const renderShareButton = () => (
    <button
      type="button"
      data-testid="share-btn"
    >
      Compartilhar
    </button>
  );

  const renderFavoriteButton = () => (
    <button
      type="button"
      data-testid="favorite-btn"
    >
      Favoritar
    </button>
  );

  const filterIngredients = () => {
    const recipeKeys = Object.keys(recipe);
    const recipeIngredientKeys = recipeKeys.filter((propriety) => (
      propriety.includes('strIngredient')));
    return recipeIngredientKeys.filter((ingredientKey) => (
      recipe[ingredientKey] !== '' && recipe[ingredientKey] !== null
    )).map((ingredintsKeys) => (
      recipe[ingredintsKeys]
    ));
  };

  const filterMeasures = () => {
    const measureKeys = Object.keys(recipe);
    const measureIngredientKeys = measureKeys.filter((propriety) => (
      propriety.includes('strMeasure')));
    return measureIngredientKeys.filter((measureKey) => (
      recipe[measureKey] !== '' && recipe[measureKey] !== null
    )).map((measureKey) => (
      recipe[measureKey]
    ));
  };

  const renderRecipeIngredients = () => {
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
  };

  const renderRecipeInstructions = () => (
    <div>
      <h3>Modo de preparo:</h3>
      <p
        data-testid="instructions"
      >
        { recipe.strInstructions }
      </p>
    </div>
  );

  const renderRecipeVideo = () => (
    <iframe
      title="video"
      width="300"
      height="300"
      src={ recipe.strYoutube }
      data-testid="video"
    />
  );

  const renderStartRecipeButton = () => (
    <button
      className="footer"
      type="button"
      data-testid="start-recipe-btn"
    >
      Iniciar receita
    </button>
  );

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
      <RecomendedDinks />
      { renderStartRecipeButton() }
    </div>
  );
};

MealDetails.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default MealDetails;
