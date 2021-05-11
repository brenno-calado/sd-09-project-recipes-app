import React from 'react';
import { Link } from 'react-router-dom';

const StartButton = ({ id, startRecipe }) => {
  const storageProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgressFound = storageProgress !== null
    ? Object.keys(storageProgress.cocktails)
    : [];
  const inProgress = inProgressFound.includes(id);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const done = doneRecipes !== null ? Object.keys(doneRecipes.cocktails).includes(id)
    : false;
  return (
    <Link to={ `/bebidas/${id}/in-progress` }>
      <button
        className={ done ? 'invisible-btn' : 'start-recipe basic-btn' }
        type="button"
        data-testid="start-recipe-btn"
        onClick={ startRecipe }
      >
        {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </Link>
  );
};

export default StartButton;
