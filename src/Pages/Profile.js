import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import '../Styles/Profile.css';

class Profile extends React.Component {
  render() {
    return (
      <div className="profileContainer">
        <header className="headerContainer">
          <img
            src={ profileIcon }
            alt="Profile Icon"
            data-testid="profile-top-btn"
          />
          <span data-testid="page-title">Perfil</span>
        </header>
        <main>
          <span data-testid="profile-email">email</span>
          <div className="buttons">
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
            <button
              type="button"
              data-testid="profile-logout-btn"
            >
              Sair
            </button>
          </div>
        </main>
      </div>
    );
  }
}

export default Profile;
