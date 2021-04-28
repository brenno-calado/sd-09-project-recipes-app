import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getStorage } from '../helpers/index';

function Profile() {
  const history = useHistory();

  const handleClick = ({ target: { name } }) => {
    if (name === '/') {
      localStorage.clear();
    }
    history.push(name);
  };

  return (
    <div>
      <Header />
      <div data-testid="profile-email">{getStorage('user')}</div>
      <button
        name="/receitas-feitas"
        type="button"
        data-testid="profile-done-btn"
        onClick={ handleClick }
      >
        Receitas Feitas
      </button>
      <button
        name="/receitas-favoritas"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleClick }
      >
        Receitas Favoritas
      </button>
      <button
        name="/"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
