import React from 'react';
import '../styles/Header.css';
import Header from '../components/Header';
import NavReceitasFeitas from '../components/NavReceitasFeitas';
import ContentDoneRecipes from '../components/ContentDoneRecipes';

function ReceitasFeitas() {
  return (
    <div>
      <Header page="Receitas Feitas" hasSearchButton={ false } />
      <NavReceitasFeitas />
      <ContentDoneRecipes />
    </div>
  );
}

export default ReceitasFeitas;
