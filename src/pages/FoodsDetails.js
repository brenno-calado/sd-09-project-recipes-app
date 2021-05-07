import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import RecommendedDrinks from '../components/RecommendedDrinks';
import './Pages.css';

function FoodsDetails() {
  const { idRecipe, setIdRecipes } = useContext(RecipesContext);
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const { pathname } = history.location;
  const example = true;
  const completeRecipe = false;
  const refStringPath = 9;
  const id = (pathname).slice(refStringPath);
  setIdRecipes(id);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`);
        const result = await response.json();
        setRecipe(result.meals[0]);
      } catch (error) {
        return Error(error);
      }
    };
    fetchRecipe();
  }, [idRecipe]);

  function startRecipes() {
    history.push(`/comidas/${idRecipe}/in-progress`);
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
      className="start-recipe-btn"
      onClick={ startRecipes }
    >
      {example ? 'Iniciar Receita' : 'Continuar Receita'}
    </button>
  );

  return (
    <div>
      <Recipes
        recipe={ recipe }
        thumb={ recipe.strMealThumb }
        category={ recipe.strCategory }
        recipeTitle={ recipe.strMeal }
        recipeInstruction={ recipe.strInstructions }
        ingredientsList={ filterIngredients() }
        measureList={ filterMeasures() }
        route="comida"
      />
      <iframe
        title="video"
        width="300"
        height="300"
        src={ recipe.strYoutube }
        data-testid="video"
      />
      <RecommendedDrinks />
      { completeRecipe ? null : renderStartRecipeButton() }
    </div>
  );
}

export default FoodsDetails;
