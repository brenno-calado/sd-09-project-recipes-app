import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const { values: { user: { email } } } = useContext(LoginContext);

  const history = useHistory();

  const userEmail = JSON.parse(localStorage.getItem('user')).email || email;

  const handleSubmitDone = () => {
    history.push('/receitas-feitas');
  };

  const handleSubmitFavorite = () => {
    history.push('/receitas-favoritas');
  };

  const sendToHome = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <span
        data-testid="profile-email"
      >
        {userEmail}
      </span>
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
      <Footer />
    </div>
  );
}

export default Perfil;
