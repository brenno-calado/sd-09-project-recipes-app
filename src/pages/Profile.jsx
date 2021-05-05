import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Styles/Profile.css';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="Profile">
      <Header title="Perfil" />
      <main>
        <h1 className="email" data-testid="profile-email">
          {email}
        </h1>
        <div className="buttons">
          <button
            data-testid="profile-done-btn"
            className="button"
            type="button"
          >
            Receitas Feitas
          </button>
          <button
            data-testid="profile-favorite-btn"
            className="button"
            type="button"
          >
            Receitas Favoritas
          </button>
          <button
            data-testid="profile-logout-btn"
            className="button"
            type="button"
          >
            Sair
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
