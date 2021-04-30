import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Header, Footer } from '../components';

function Profile() {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const email = localStorage.user && JSON.parse(localStorage.user).email;

  const handleLogout = () => {
    localStorage.clear();
    setShouldRedirect(true);
  };

  const createButton = (testid, name, onClick) => (
    <button data-testid={ testid } type="button" onClick={ onClick }>{ name }</button>
  );

  if (shouldRedirect) return <Redirect to="/" />;

  return (
    <section>
      <Header title="Perfil" />
      <p data-testid="profile-email">{ email }</p>
      <Link to="/receitas-feitas">
        { createButton('profile-done-btn', 'Receitas Feitas') }
      </Link>
      <Link to="/receitas-favoritas">
        { createButton('profile-favorite-btn', 'Receitas Favoritas') }
      </Link>
      { createButton('profile-logout-btn', 'Sair', handleLogout) }
      <Footer />
    </section>
  );
}

export default Profile;
