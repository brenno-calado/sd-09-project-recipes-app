import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const getUserEmail = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email) return user.email;
    return '';
  };
  const userEmail = getUserEmail();

  const clearStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Perfil" />
      <h4 data-testid="profile-email">{ userEmail }</h4>
      <div>
        <Link to="/receitas-feitas">
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            Receitas Feitas
          </button>
        </Link>
      </div>
      <div>
        <Link to="/receitas-favoritas">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Receitas Favoritas
          </button>
        </Link>
      </div>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ clearStorage }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
};

export default Profile;
