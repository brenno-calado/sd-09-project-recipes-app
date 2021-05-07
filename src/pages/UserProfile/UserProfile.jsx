import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';

function UserProfile({ history }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    function getEmail() {
      const e = JSON.parse(localStorage.getItem('user'));
      setEmail(e.email);
    }
    getEmail();
  }, []);

  function redirectTo(url) {
    history.push(url);
  }

  function handleLogOut() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header title="Perfil" isSearchEnable={ false } />
      <h1 data-testid="profile-email">{ email }</h1>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => redirectTo('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => redirectTo('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleLogOut }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

UserProfile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserProfile;
