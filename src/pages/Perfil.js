import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

function Perfil() {
  const history = useHistory();
  function clearLocalStorage() {
    localStorage.removeItem('email');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  }
  const email = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header title="Perfil" showExplorerButton={ false } />
      <p data-testid="profile-email">
        {email && email.email}
      </p>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => clearLocalStorage() }
      >
        Sair
      </button>
      <Link to="/receitas-feitas">
        <button data-testid="profile-done-btn" type="button">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Perfil;
