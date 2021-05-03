import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Recipes from '../components/Recipes';
import './Pages.css';

function FoodsDetails() {
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const id = 178319;
  const example = true;
  const completeRecipe = false;

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

  function startRecipes() {
    history.push(`/comidas/${id}/in-progress`);
  }

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

  const renderStartRecipeButton = () => (
    <button
      type="button"
      data-testid="start-recipe-btn"
    >
      {example ? 'Iniciar Receita' : 'Continuar Receita'}
    </button>
  );
  return (
    <div>
      <Recipes
        thumb={ recipe.strMealThumb }
        category={ recipe.strCategory }
        recipeTitle={ recipe.strMeal }
        recipeInstruction={ recipe.strInstructions }
        ingredientsList={ filterIngredients() }
        measureList={ filterMeasures() }
      />
      <iframe
        title="video"
        width="300"
        height="300"
        src={ recipe.strYoutube }
        data-testid="video"
      />
      <button
        className="recipes-start"
        type="button"
        onClick={ startRecipes }
      >
        { completeRecipe ? null : renderStartRecipeButton() }
      </button>
    </div>
  );
}

export default FoodsDetails;
