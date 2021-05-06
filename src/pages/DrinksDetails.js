import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import RecommendedFood from '../components/RecommendedFood';

function DrinksDetails() {
  // const { idRecipe } = useContext(RecipesContext);
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const example = true;
  const completeRecipe = false;
  const id = 178319;
  // const id = 178353;

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const result = await response.json();
      setRecipe(result.drinks[0]);
    };
    fetchRecipe();
  }, [id]);
  console.log(recipe);
  function startRecipes() {
    history.push(`/bebidas/${id}/in-progress`);
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
      {example ? 'Iniciar Receita' : 'Continuar Receita'}
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
