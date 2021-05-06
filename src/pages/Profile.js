import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

function Profile() {
  const [emailInfo, getEmail] = useState('');

  function emailFromLocalStorage() {
    const result = JSON.parse(localStorage.getItem('user'));
    const { email } = result;
    return getEmail(email);
  }

  useEffect(() => {
    emailFromLocalStorage();
  }, []);
  return (
    <>
      <Header pageName="Perfil" searchBtn={ false } />
      <div>
        <h3 data-testid="profile-email">{`User: ${emailInfo}`}</h3>
        <div className="explore-container">
          <Link to="/receitas-feitas">
            <button
              type="button"
              className="explore-cards"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link to="/receitas-favoritas">
            <button
              type="button"
              className="explore-cards"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              className="explore-cards"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </button>
          </Link>
        </div>
      </div>
      <FooterMenu />
    </>
  );
}

export default Profile;
