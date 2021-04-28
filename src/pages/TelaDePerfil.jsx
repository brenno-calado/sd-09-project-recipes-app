import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

function ProfileScreen() {
  const [done, setDone] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [logout, setLogout] = useState(false);

  // retirar o useEffect depois que a funcionalidade
  // de salvar no localStorage estiver funcionando  :)
  useEffect(() => {
    localStorage.setItem('user', 'mcsWittho@gmail.com');
  }, []);

  function handleRedirect({ target: { name } }) {
    if (name === 'done') {
      setDone(true);
    } else if (name === 'favorite') {
      setFavorite(true);
    } else if (name === 'logout') {
      setLogout(true);
      localStorage.removeItem('user');
    }
  }

  return (
    <>
      { done ? <Redirect to="/receitas-feitas" /> : null }

      { favorite ? <Redirect to="/receitas-favoritas" /> : null }

      { logout ? <Redirect to="/" /> : null }

      <Header textProp="Perfil" />

      <p className="email" data-testid="profile-email">
        { localStorage.getItem('user') }
      </p>

      <button
        type="button"
        data-testid="profile-done-btn"
        name="done"
        onClick={ handleRedirect }
      >
        Receitas Feitas
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        name="favorite"
        onClick={ handleRedirect }
      >
        Receitas Favoritas
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        name="logout"
        onClick={ handleRedirect }
      >
        Sair
      </button>

      <Footer />
    </>
  );
}

export default ProfileScreen;
