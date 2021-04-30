import React, { useContext } from 'react';
import Card from '../components/Card';
import { RecipesContext } from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Categories from '../components/Categories';

function ReceitasPrincipal() {
  const { values: { isFetching } } = useContext(RecipesContext);
  return !isFetching ? (
    <>
      <Header />
      <Card />
     {/*  <Categories /> */}
      <Footer />
    </>
  ) : <span>Carregando ...</span>;
}

export default ReceitasPrincipal;
