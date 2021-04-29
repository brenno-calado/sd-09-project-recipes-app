import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/header';
import Footer from '../components/footer';

export default function MainPageFood() {
  return (
    <>
      <Header page="Perfil" />
      <main className="perfil">
        <Link to="/receitas-feitas">
          <btn data-testid="profile-done-btn">Receitas Feitas</btn>
        </Link>
        <Link to="/receitas-favoritas">
          <btn testid="profile-favorite-btn">Receitas Favoritas</btn>
        </Link>
        <Link to="/">
          <brn data-testid="profile-logout-btn">Sair</brn>
        </Link>
      </main>
      <Footer />
    </>
  );
}
