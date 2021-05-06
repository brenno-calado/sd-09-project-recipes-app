import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { bool } from 'prop-types';
import { getItemLocalStorage,
  setItemLocalStorage } from '../services/servicesLocalStorage';

export default function StartButton({ isFood }) {
  const { pathname } = window.location;
  const id = pathname.split('/')[2];
  const type = isFood ? 'meals' : 'cocktails';
  const startedRecipes = getItemLocalStorage('inProgressRecipes');
  if (!startedRecipes) {
    setItemLocalStorage('inProgressRecipes', { cocktails: {}, meals: {} });
  }
  const [inProgress, setProgress] = useState(false);
  const [redirectProgress, setRedirect] = useState(false);
  const startRecipe = () => {
    setItemLocalStorage('inProgressRecipes',
      { ...startedRecipes, [type]: { ...startedRecipes[type], [id]: ['test'] } });
    setRedirect(true);
  };
  useEffect(() => {
    const list = Object.keys(getItemLocalStorage('inProgressRecipes')[type]);
    if (list) {
      const isInProgress = list.some((e) => e === id);
      setProgress(isInProgress);
    }
  }, [id, type]);
  if (redirectProgress) {
    return <Redirect to={ `${pathname}/in-progress` } />;
  }
  const fixed = {
    position: 'fixed',
    bottom: 0,
    right: 0,
  };
  const buttonText = inProgress ? 'Continuar Receita' : 'Iniciar receita';
  return (
    <button
      style={ fixed }
      className="btn btn-info border border-info"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ startRecipe }
    >
      { buttonText }
    </button>
  );
}

StartButton.propTypes = {
  isFood: bool,
}.isRequired;
