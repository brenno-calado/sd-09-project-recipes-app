import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import RecommendedFood from '../components/RecommendedFood';
import setStorage from '../helpers/index';

function DrinksDetails() {
  const { idRecipe, setIdRecipes, setHearthIco } = useContext(RecipesContext);
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const [progressStatus] = useState(false);
  const [completeRecipe] = useState(false);
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
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await response.json();
        setRecipe(result.drinks[0]);
      } catch (error) {
        return Error(error);
      }
    };
    compareId();
    fetchRecipe();
  }, [idRecipe, progressStatus]);

  function startRecipes() {
    history.push(`/bebidas/${idRecipe}/in-progress`);
    if (progressStatus === false) {
      setStorage('initRecipes', ([{ id: idRecipe }]));
    }
  }

  const filterIngredients = () => {
    const recipeKeys = Object.keys(recipe);
    const recipeIngredientKeys = recipeKeys.filter((propriety) => (
      propriety.includes('strIngredient')));
    return recipeIngredientKeys.filter((ingredientKey) => (
      recipe[ingredientKey] !== null && recipe[ingredientKey] !== ''
    )).map((ingredintsKeys) => (
      recipe[ingredintsKeys]
    ));
  };

  const filterMeasures = () => {
    const measureKeys = Object.keys(recipe);
    const measureIngredientKeys = measureKeys.filter((propriety) => (
      propriety.includes('strMeasure')));
    return measureIngredientKeys.filter((measureKey) => (
      recipe[measureKey] !== null && recipe[measureKey] !== ''
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
        thumb={ recipe.strDrinkThumb }
        category={ recipe.strAlcoholic }
        recipeTitle={ recipe.strDrink }
        recipeInstruction={ recipe.strInstructions }
        ingredientsList={ filterIngredients() }
        measureList={ filterMeasures() }
        route="bebida"
        id={ id }
      />
      <RecommendedFood />
      { completeRecipe ? null : renderStartRecipeButton() }
    </div>
  );
}

// DrinksDetails.propTypes = {
//   match: PropTypes.object,
//   params: PropTypes.object,
//   id: PropTypes.string,
// }.isRequired;

export default DrinksDetails;
