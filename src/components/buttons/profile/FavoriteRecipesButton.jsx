import React from 'react';
import { useHistory } from 'react-router';

function FavoriteRecipesButton() {
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid="profile-favorite-btn"
      className="basic-btn"
      onClick={ () => history.push('/receitas-favoritas') }
    >
      Receitas Favoritas
    </button>
  );
}

export default FavoriteRecipesButton;
