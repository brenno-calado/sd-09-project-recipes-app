import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Header, Footer } from '../components';
import '../css/Profile.css';

function Profile() {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const email = localStorage.user && JSON.parse(localStorage.user).email;

  const handleLogout = () => {
    localStorage.clear();
    setShouldRedirect(true);
  };

  const createButton = (testid, name, colorButton, onClick) => (
    <button
      data-testid={ testid }
      type="button"
      onClick={ onClick }
      className={ `button-profile ${colorButton}` }
    >
      { name }
    </button>
  );

  if (shouldRedirect) return <Redirect to="/" />;

  return (
    <section>
      <Header title="Perfil" profilePage />
      <main className="main-profile">
        <h4 className="title-data">Dados da conta</h4>
        <div className="data-container">
          <div className="data">
            <span>Email: </span>
            <p data-testid="profile-email">{email}</p>
          </div>
        </div>
        <Link to="/receitas-feitas">
          { createButton('profile-done-btn', 'Receitas Feitas', 'orange') }
        </Link>
        <Link to="/receitas-favoritas">
          { createButton('profile-favorite-btn', 'Receitas Favoritas', 'blue') }
        </Link>
        { createButton('profile-logout-btn', 'Sair', 'red small-btn', handleLogout) }
      </main>
      <Footer />
    </section>
  );
}

export default Profile;
