import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

function ReceitasFavoritas() {
  return (
    <>
      <Header textProp="Receitas Favoritas" />
      <h1>Receitas Favoritas</h1>
      <Footer />
    </>
  );
}

export default ReceitasFavoritas;
