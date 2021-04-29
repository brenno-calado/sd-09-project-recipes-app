import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../styles/profile.css';

export default function Profile() {
  const history = useHistory();
  const [storage, setStorage] = useState();

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem('user'));
    setStorage(getUser);
  }, []);

  return (
    <section className="container-profile">
      <section className="profile-icon">
        <Header2 title="Perfil" />
      </section>
      <h1
        data-testid="profile-email"
        className="email"
      >
        { storage ? storage.email : '' }
      </h1>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
        className="recipe-buttons"
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
        className="recipe-buttons"
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          history.push('/');
          localStorage.clear();
        } }
        className="leave-button"
      >
        Sair
      </button>
      <Footer />
    </section>
  );
}
