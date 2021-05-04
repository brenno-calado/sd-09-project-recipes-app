import React from 'react';
import { useHistory } from 'react-router';

function DoneRecipesButton() {
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid="profile-done-btn"
      className="basic-btn"
      onClick={ () => history.push('/receitas-feitas') }
    >
      Receitas Feitas
    </button>
  );
}

export default DoneRecipesButton;
