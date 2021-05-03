import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
      <h1> Perfil </h1>
      <Header />
      <Footer />
    </div>
  );
}

export default Perfil;
