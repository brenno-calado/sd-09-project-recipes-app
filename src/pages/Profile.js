import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Header, Footer } from '../components';

const INITIAL_STATE = { shouldRedirect: false };

function Profile() {
  const [state, setState] = useState(INITIAL_STATE);

  const handleLogout = () => {
    localStorage.clear();
    setState({ ...state, shouldRedirect: true });
  };

  const createButton = (testid, name, onClick) => (
    <button data-testid={ testid } type="button" onClick={ onClick }>{ name }</button>
  );

  if (state.shouldRedirect) return <Redirect to="/" />;

  return (
    <section>
      <Header title="Perfil" />

      <p data-testid="profile-email">{ JSON.parse(localStorage.user).email }</p>

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
