import React from 'react';
import PropTypes from 'prop-types';

function FoodInProgress({ match }) {
  const { id } = match.params;
  const finishRecipe = () => {
    localStorage.setItem(`conclude${id}`, 'true');
  };

  return (
    <div>
      <h3>Comida em progresso...</h3>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ finishRecipe }
      >
        Concluir Receita
      </button>
    </div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.string),
}.isRequired;

export default FoodInProgress;
