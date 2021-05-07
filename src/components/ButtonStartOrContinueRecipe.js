import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

export default function ButtonStartOrContinueRecipe({ isMeal, id }) {
  const history = useHistory();

  function isInProgress() {
    const localData = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!localData) return false;
    if (isMeal) {
      return Object.entries(localData.meals)
        .some((recipe) => recipe[0] === id);
    }
    if (!isMeal) {
      return Object.entries(localData.cocktails)
        .some((recipe) => recipe[0] === id);
    }
  }

  function handleClick() {
    const inProgressRecipes = {
      [isMeal ? 'meals' : 'cocktails']: {
        [id]: [],
      },
    };
    if (isInProgress()) {
      history.push(`/${isMeal ? 'comidas' : 'bebidas'}/${id}/in-progress`);
    }
    if (!isInProgress()) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      history.push(`/${isMeal ? 'comidas' : 'bebidas'}/${id}/in-progress`)
    }
  }

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="fixed-bottom btn btn-primary btn-block"
      onClick={ handleClick }
    >
      {isInProgress() ? 'Continuar Receita' : 'Iniciar receita'}
    </button>
  );
}

ButtonStartOrContinueRecipe.propTypes = {
  isMeal: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
