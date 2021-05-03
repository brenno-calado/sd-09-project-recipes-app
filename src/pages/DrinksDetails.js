import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Recipes from '../components/Recipes';

function DrinksDetails() {
  const [recipe, setRecipe] = useState({});
  const history = useHistory();
  const id = 178319;
  const example = true;

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

  return (
    <div>
      <Recipes
        thumb={ recipe.strDrinkThumb }
        category={ recipe.strAlcoholic }
        recipeTitle={ recipe.strDrink }
        recipeInstruction={ recipe.strInstructions }
        ingredientsList={ filterIngredients() }
        measureList={ filterMeasures() }
      />
      <button
        className="recipes-start"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ startRecipes }
      >
        { example ? 'Iniciar Receita' : 'Continuar Receita' }
      </button>
    </div>
  );
}

// DrinksDetails.propTypes = {
//   match: PropTypes.object,
//   params: PropTypes.object,
//   id: PropTypes.string,
// }.isRequired;

export default DrinksDetails;
