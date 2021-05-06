import React, { useContext } from 'react';
import Card from '../components/Card';
import { RecipesContext } from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Dropdown from '../components/Dropdown';

export default function ExplorarArea() {
  const { values: { recipesResult, isFetching } } = useContext(RecipesContext);

  return !isFetching ? (
    <>
      <Header />
      <Dropdown />
      <Card data={ recipesResult } />
      <Footer />
    </>
  ) : <Loading />;
}
