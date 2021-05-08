import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import setStorage from '../helpers/index';
import Recipes from '../components/Recipes';
import RecommendedDrinks from '../components/RecommendedDrinks';
import './Pages.css';

function FoodsDetails() {
  const { idRecipe, setIdRecipes, setHearthIco } = useContext(RecipesContext);
  const [recipe, setRecipe] = useState({});
  const [progressStatus] = useState(false);
  const [completeRecipe] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  const refStringPath = 9;
  const id = (pathname).slice(refStringPath);
  setIdRecipes(id);

  const compareId = async () => {
    try {
      const startedRecipes = await JSON.parse(localStorage.getItem('favoriteRecipes'));
      startedRecipes.forEach((element) => {
        if (element.id === idRecipe) { setHearthIco(true); }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    compareId();
  }, [idRecipe, progressStatus]);

  function startRecipes() {
    history.push(`/comidas/${idRecipe}/in-progress`);
    if (progressStatus === false) {
      setStorage('initRecipes', ([{ id: idRecipe }]));
    }
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
      {!progressStatus ? 'Iniciar Receita' : 'Continuar Receita'}
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
        id={ id }
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
