import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  verifyIfRecipeWasStarted, verifyIfRecipeWasFinished, startRecipe,
} from '../helpers/VerifyRecipeStatus';

function StartRecipeButton({ id, recipe, recipeType }) {
  const [recipeState, setRecipeState] = useState();

  useEffect(() => {
    if (!localStorage.getItem('doneRecipes')) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (!localStorage.getItem('inProgressRecipes')) {
      const object = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(object));
    }
    const isStarted = verifyIfRecipeWasStarted(recipe);
    const isFinished = verifyIfRecipeWasFinished(recipe);
    if (isStarted === 'started') setRecipeState('started');
    if (isFinished === 'finished') setRecipeState('finished');
  }, [recipe]);

  const startRecipeButton = (
    <Link to={ `/${recipeType}/${id}/in-progress` }>
      <button
        type="button"
        onClick={ () => startRecipe(recipe, recipeType) }
        data-testid="start-recipe-btn"
      >
        { !recipeState ? 'Iniciar Receita' : 'Continuar Receita' }
      </button>
    </Link>
  );

  return (
    <div className="start-recipe-btn-container">
      { recipeState !== 'finished' && startRecipeButton }
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipe: state.recipeDetailsReducer.recipe,
  recipeType: state.recipesReducer.recipeType,
});

StartRecipeButton.propTypes = {
  id: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf().isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(StartRecipeButton);
