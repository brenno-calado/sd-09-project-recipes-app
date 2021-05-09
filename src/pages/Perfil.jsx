import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { LoginContext } from '../context';

function Perfil() {
  const { values: user } = useContext(LoginContext);

  const [email, setEmail] = useState(user.email || '');

  const history = useHistory();

  useEffect(() => {
    if (user.email) setEmail(user.email);
  }, [user.email]);

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
      <spam
        data-testid="profile-email"
      >
        {email}
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
