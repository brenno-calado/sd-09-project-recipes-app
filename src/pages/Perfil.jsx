import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../context';

function Perfil() {
  const { values } = useContext(LoginContext);
  const { user } = values;
  console.log(user);
  const history = useHistory();

  const handleSubmitDone = () => {
    history.push('/receitas-feitas');
  };

  const handleSubmitFavorite = () => {
    history.push('/receitas-favoritas');
  };

  const handleSubmitLogin = () => {
    history.push('/');
  };

  return (
    <div>
      <spam
        value={ values.user }
        data-testid="profile-email"
      />
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleSubmitDone }
      >
        Receitas Feitas
      </button>
      <br />
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleSubmitFavorite }
      >
        Receitas Favoritas
      </button>
      <br />
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleSubmitLogin }
      >
        Sair
      </button>
    </div>
  );
}

export default Perfil;
