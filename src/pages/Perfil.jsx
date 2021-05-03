import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const localStorageUser = localStorage.getItem('user');
  const emailUser = JSON.parse(localStorageUser);
  console.log(emailUser);

  const history = useHistory();

  const handleSubmitDone = () => {
    history.push('/receitas-feitas');
  };

  const handleSubmitFavorite = () => {
    history.push('/receitas-favoritas');
  };

  const sendToHome = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <spam
        data-testid="profile-email"
      >
        {emailUser.email}
      </spam>
      <br />
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
        onClick={ sendToHome }
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
