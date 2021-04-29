import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';

export default function MainPageFood() {
  return (
    <div>
      <div>
        <Link to="/myRecipes">
          <h2>Receitas Feitas</h2>
        </Link>
        <Link to="/favoriteRecipes">
          <h2>Receitas Favoritas</h2>
        </Link>
        <Link to="/mainPage">
          <h2>Sair</h2>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
