import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToStartedMeals, addToStartedCocktails } from '../redux/actions';

function StartRecipeButton({
  recipeType,
  recipe,
  startMealsRecipe,
  startCocktailsRecipe,
  startedMeals,
  startedCocktails,
  finishedMeals,
  finishedCocktails,
  id,
}) {
  const [recipeState, setRecipeState] = useState();

  const verifyIfRecipeWasStarted = () => {
    const mealsStarted = startedMeals.some((item) => (
      item.idMeal === recipe.idMeal
    ));
    const cocktailsStarted = startedCocktails.some((item) => (
      item.idDrink === recipe.idDrink
    ));
    if (mealsStarted || cocktailsStarted) setRecipeState('started');
  };

  const verifyIfRecipeWasFinished = () => {
    const mealsFinished = finishedMeals.some((item) => (
      item.idMeal === recipe.idMeal
    ));
    const cocktailsFinished = finishedCocktails.some((item) => (
      item.idDrink === recipe.idDrink
    ));
    if (mealsFinished || cocktailsFinished) setRecipeState('finished');
  };

  useEffect(() => {
    verifyIfRecipeWasStarted();
    verifyIfRecipeWasFinished();
  }, [recipe]);

  const startRecipeButton = (
    <Link to={ `/comidas/${id}/in-progress` }>
      <button
        type="button"
        onClick={
          recipeType === 'meals'
            ? () => startMealsRecipe(recipe)
            : () => startCocktailsRecipe(recipe)
        }
        data-testid="start-recipe-btn"
      >
        { !recipeState ? 'Iniciar Receita' : 'Continuar Receita' }
      </button>
    </Link>
  );

  return (
    <div>
      { recipeState !== 'finished' && startRecipeButton }
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipe: state.recipeDetailsReducer.recipe,
  recipeType: state.recipesReducer.recipeType,
  startedMeals: state.recipeDetailsReducer.startedMeals,
  startedCocktails: state.recipeDetailsReducer.startedCocktails,
  finishedMeals: state.recipeDetailsReducer.finishedMeals,
  finishedCocktails: state.recipeDetailsReducer.finishedCocktails,
});

const mapDispatchToProps = (dispatch) => ({
  startMealsRecipe: (recipe) => dispatch(addToStartedMeals(recipe)),
  startCocktailsRecipe: (recipe) => dispatch(addToStartedCocktails(recipe)),
});

StartRecipeButton.propTypes = {
  recipeType: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf().isRequired,
  startMealsRecipe: PropTypes.func.isRequired,
  startCocktailsRecipe: PropTypes.func.isRequired,
  startedMeals: PropTypes.arrayOf(PropTypes.object).isRequired,
  startedCocktails: PropTypes.arrayOf(PropTypes.object).isRequired,
  finishedMeals: PropTypes.arrayOf(PropTypes.object).isRequired,
  finishedCocktails: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartRecipeButton);
