import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'react-bootstrap';

function Perfil() {
  return (
    <>
      <Header title="Perfil" searchIcon={ false } />
      <h4 data-testid="profile-email">
        { JSON.parse(localStorage.getItem('user')).email }
      </h4>
      <Link to="/receitas-feitas">
        <button
          className="btn btn-warning"
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <br />
      <Link to="/receitas-favoritas">
        <button
          className="btn btn-success"
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <br />
      <Link to="/">
        <button
          className="btn btn-dark"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default Perfil;
