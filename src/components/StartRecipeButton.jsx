import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function StartRecipeButton({ id, type }) {
  const [isInProgress, setIsInProgress] = useState(false);
  const [showStartRecipeBtn, setShowStartRecipeBtn] = useState(true);

  function handleClickStartRecipe() {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ [type]: { [id]: [] } }));
      setIsInProgress(true);
      return;
    }
    setIsInProgress(true);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: { ...inProgressRecipes[type], [id]: [] },
    }));
  }

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if ((inProgressRecipes !== null)
      && (inProgressRecipes[type] !== undefined)
      && (inProgressRecipes[type][id] !== undefined)) {
      setIsInProgress(true);
    }
    if ((doneRecipes !== null) && (doneRecipes.some((recipe) => recipe.id === id))) {
      setShowStartRecipeBtn(false);
    }
  }, [id, type]);

  return (
    <div>
      { (showStartRecipeBtn) && (
        <Link to={ `/${(type === 'meals' ? 'comidas' : 'bebidas')}/${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="button-start-recipe"
            onClick={ handleClickStartRecipe }
          >
            { (isInProgress) ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        </Link>
      ) }
    </div>
  );
}

StartRecipeButton.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
}.isRequired;

export default StartRecipeButton;
