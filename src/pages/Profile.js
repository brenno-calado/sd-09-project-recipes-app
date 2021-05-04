import React from 'react';
import { useHistory } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import BottomMenu from '../components/BottomMenu';

function Profile() {
  const preEmail = JSON.parse(localStorage.getItem('user'));
  const { email } = preEmail;
  const history = useHistory();

  function redirect({ target }) {
    const btnName = target.name;
    if (btnName === 'favoritas') {
      history.push('/receitas-favoritas');
    }
    if (btnName === 'feitas') {
      history.push('/receitas-feitas');
    }
  }

  function redirectClear() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Perfil</h1>
      </HeaderFoods>
      <h2 data-testid="profile-email">{email}</h2>
      <button
        type="button"
        name="feitas"
        data-testid="profile-done-btn"
        onClick={ redirect }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        name="favoritas"
        data-testid="profile-favorite-btn"
        onClick={ redirect }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        name="sair"
        data-testid="profile-logout-btn"
        onClick={ redirectClear }
      >
        Sair
      </button>
      <BottomMenu />
    </>
  );
}

export default Profile;
