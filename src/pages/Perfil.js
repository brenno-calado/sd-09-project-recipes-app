import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/Perfil.css';
import 'react-bootstrap';

function Perfil() {
  const email = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')).email
    : '';
  return (
    <>
      <Header title="Perfil" searchIcon={ false } />
      <section className="profile-section">
        <h4 data-testid="profile-email">{email}</h4>
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
      </section>
      <Footer />
    </>
  );
}

export default Perfil;
