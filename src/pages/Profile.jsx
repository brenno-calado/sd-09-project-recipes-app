import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = localStorage.getItem('user');

  function handleLogoutButton() {
    localStorage.clear();
  }

  function renderEmail() {
    return <h3 data-testid="profile-email">{user}</h3>;
  }

  function renderDoneRecipesButton() {
    return (
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
    );
  }

  function renderFavoriteRecipesButton() {
    return (
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
    );
  }

  function renderLogoutButton() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogoutButton }
        >
          Sair
        </button>
      </Link>
    );
  }

  return (
    <div>
      <Header title="Perfil" />
      {renderEmail()}
      {renderDoneRecipesButton()}
      {renderFavoriteRecipesButton()}
      {renderLogoutButton()}
      <Footer />
    </div>
  );
}

export default Profile;
