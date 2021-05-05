import React, { useContext } from 'react';
import Card from '../components/Card';
import { RecipesContext } from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Dropdown from '../components/Dropdown';

function ReceitasPrincipal() {
  const { values: { isFetching, recipesResult } } = useContext(RecipesContext);
  return !isFetching ? (
    <>
      <Header />
      <Dropdown data={ recipesResult } />
      <Card data={ recipesResult } />
      <Footer />
    </>
  ) : <Loading />;
}

export default ReceitasPrincipal;
