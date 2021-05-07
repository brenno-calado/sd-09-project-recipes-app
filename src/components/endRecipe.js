import React, { useState } from 'react';
import { bool } from 'prop-types';
import { Redirect, useParams } from 'react-router';
import { getItemLocalStorage,
  setItemLocalStorage } from '../services/servicesLocalStorage';

export default function EndRecipe({ isReady, isFood }) {
  const [redirect, setRedirect] = useState(false);
  const type = isFood ? 'meals' : 'drinks';
  const { id } = useParams();

  const handleClick = () => {
    const inProgress = getItemLocalStorage('inProgressRecipes');
    const removeRec = Object.keys(inProgress[type]).filter((e) => e !== id);
    const returnFilter = removeRec.map((e) => inProgress[e]);
    console.log(returnFilter);
    setItemLocalStorage('inProgressRecipes',
      { ...inProgress, [type]: { ...returnFilter } });
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/receitas-feitas" />;
  }

  return (
    <button
      onClick={ handleClick }
      disabled={ !isReady }
      className="fixed-btn btn btn-info"
      type="button"
      data-testid="finish-recipe-btn"
    >
      Concluir receita
    </button>);
}

EndRecipe.propTypes = {
  isReady: bool,
}.isRequired;
