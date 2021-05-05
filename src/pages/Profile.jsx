import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Styles/Profile.css';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    localStorage.clear();
  };

  return (
    <div className="Profile">
      <Header title="Perfil" />
      <main>
        <h1 className="email" data-testid="profile-email">
          {email}
        </h1>
        <div className="buttons">
          <Link className="link" to="/receitas-feitas">
            <button
              data-testid="profile-done-btn"
              className="button"
              type="button"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link className="link" to="/receitas-favoritas">
            <button
              data-testid="profile-favorite-btn"
              className="button"
              type="button"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link className="link" to="/">
            <button
              data-testid="profile-logout-btn"
              className="button"
              type="button"
              onClick={ handleClick }
            >
              Sair
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
