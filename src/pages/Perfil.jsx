import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';

function Perfil() {
  const renderEmailFromStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    return (
      <h4
        data-testid="profile-email"
      >
        {user.email}
      </h4>
    );
  };

  const handleClick = () => {
    localStorage.clear();
  };

  const renderButtons = () => (
    <>
      <Link to="receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Sair
        </button>
      </Link>
    </>
  );

  return (
    <div>
      <Header page="Perfil" hasSearchButton={ false } />
      {renderEmailFromStorage()}
      {renderButtons()}
      <BottomMenu />
    </div>
  );
}

export default Perfil;
