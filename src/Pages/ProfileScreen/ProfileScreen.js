import React from 'react';
import { useHistory } from 'react-router-dom';
import './ProfileScreen.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function ProfileScreen() {
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user')) || '';

  const recipesDone = () => {
    history.push('/receitas-feitas');
  };

  const recipesFavorites = () => {
    history.push('/receitas-favoritas');
  };

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="profile-container-main">
      <Header title="Perfil" />
      <section>
        <div>
          <span data-testid="profile-email">{userEmail.email}</span>
        </div>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ recipesDone }
        >
          Receitas Feitas
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ recipesFavorites }
        >
          Receitas Favoritas
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ logout }
        >
          Sair
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ProfileScreen;
