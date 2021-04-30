import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToStartedRecipe } from '../redux/actions';

function StartRecipeButton({
  recipe,
  startRecipe,
  startedRecipes,
  finishedRecipes,
  id,
}) {
  const [recipeState, setRecipeState] = useState();

  const verifyIfRecipeWasStarted = useCallback(() => {
    const mealsStarted = startedRecipes.some((item) => (
      item.idMeal === recipe.idMeal
    ));
    const cocktailsStarted = startedRecipes.some((item) => (
      item.idDrink === recipe.idDrink
    ));
    if (mealsStarted || cocktailsStarted) setRecipeState('started');
    if (!mealsStarted || !cocktailsStarted) setRecipeState(undefined);
  }, [startedRecipes, recipe]);

  const verifyIfRecipeWasFinished = useCallback(() => {
    const mealsFinished = finishedRecipes.some((item) => (
      item.idMeal === recipe.idMeal
    ));
    const cocktailsFinished = finishedRecipes.some((item) => (
      item.idDrink === recipe.idDrink
    ));
    if (mealsFinished || cocktailsFinished) setRecipeState('finished');
  }, [finishedRecipes, recipe]);

  useEffect(() => {
    verifyIfRecipeWasStarted();
    verifyIfRecipeWasFinished();
  }, [recipe, verifyIfRecipeWasStarted, verifyIfRecipeWasFinished]);

  const startRecipeButton = (
    <Link to={ `/comidas/${id}/in-progress` }>
      <button
        type="button"
        onClick={ () => startRecipe(recipe) }
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
  startedRecipes: state.recipeDetailsReducer.startedRecipes,
  finishedRecipes: state.recipeDetailsReducer.finishedRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  startRecipe: (recipe) => dispatch(addToStartedRecipe(recipe)),
});

StartRecipeButton.propTypes = {
  recipe: PropTypes.objectOf().isRequired,
  startRecipe: PropTypes.func.isRequired,
  startedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  finishedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartRecipeButton);
