import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

function ReceitasFeitas() {
  return (
    <>
      <Header textProp="Receitas Feitas" />
      <h1>Receitas Feitas</h1>
      <Footer />
    </>
  );
}

export default ReceitasFeitas;
