import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

function PrincipalComidas() {
  return (
    <>
      <Header textProp="Comidas" />
      <h1>Comidas</h1>
      <Footer />
    </>
  );
}

export default PrincipalComidas;
