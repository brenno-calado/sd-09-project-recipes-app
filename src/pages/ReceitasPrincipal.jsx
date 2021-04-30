import React, { useContext } from 'react';
import Card from '../components/Card';
import { RecipesContext } from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ReceitasPrincipal() {
  const { values: { isFetching } } = useContext(RecipesContext);
  return !isFetching ? (
    <>
      <Header />
      <h1> ReceitasPrincipal </h1>
      <Card />
      <Footer />
    </>
  ) : <span>Carregando ...</span>;
}

export default ReceitasPrincipal;
