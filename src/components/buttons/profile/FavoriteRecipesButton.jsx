import React from 'react';
import { useHistory } from 'react-router';

function FavoriteRecipesButton() {
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid="profile-favorite-btn"
      className="btn btn-primary"
      onClick={ () => history.push('/receitas-favoritas') }
    >
      Receitas Favoritas
    </button>
  );
}

export default FavoriteRecipesButton;
