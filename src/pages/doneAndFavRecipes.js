import React from 'react';
import Header from '../components/header';
// import { getItemLocalStorage } from '../services/servicesLocalStorage';

export default function DoneAndFavRecipes() {
  if (window.location.pathname === '/receitas-feitas') {
    return (
      <>
        <Header page="Receitas Feitas" />
        <div>
          DoneRecipes
        </div>
      </>
    );
  } if (window.location.pathname === '/receitas-favoritas') {
    return (
      <>
        <Header page="Receitas Favoritas" />
        <div>
          ReceitasFavoritas
        </div>
      </>
    );
  }
}
