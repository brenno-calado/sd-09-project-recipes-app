import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

async function ProfileScreen() {
  const [done, setDone] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const user = await JSON.parse(localStorage.getItem('user'));
  const { email } = user;

  function handleRedirect({ target: { name } }) {
    if (name === 'done') {
      setDone(true);
    } else if (name === 'favorite') {
      setFavorite(true);
    } else if (name === 'logout') {
      localStorage.clear();
    }
  }

  function buttonsGroup() {
    return (
      <>
        <button
          className="button"
          type="button"
          data-testid="profile-done-btn"
          name="done"
          onClick={ handleRedirect }
        >
          Receitas Feitas
        </button>

        <button
          className="button"
          type="button"
          data-testid="profile-favorite-btn"
          name="favorite"
          onClick={ handleRedirect }
        >
          Receitas Favoritas
        </button>

        <Link to="/">
          <button
            className="button"
            type="button"
            data-testid="profile-logout-btn"
            name="logout"
            onClick={ handleRedirect }
          >
            Sair
          </button>
        </Link>
      </>
    );
  }

  return (
    <>
      { done ? <Redirect to="/receitas-feitas" /> : null }
      { favorite ? <Redirect to="/receitas-favoritas" /> : null }

      <Header textProp="Perfil" />

      <p className="email" data-testid="profile-email">
        { `${email}` }
      </p>

      { buttonsGroup() }

      <Footer />
    </>
  );
}

export default ProfileScreen;
