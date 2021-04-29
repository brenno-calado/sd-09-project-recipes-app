import React, { useContext, useEffect } from 'react';
import { Header, DrinksCategories, DrinksComponent, Footer } from '../components';
import { Context } from '../context/Context';
import { fecthForName } from '../services/api';

function Drinks() {
  const {
    searchResult,
    setSearchResult,
  } = useContext(Context);

  useEffect(() => {
    const getData = async () => {
      setSearchResult(await fecthForName('', false));
    };
    getData();
  }, [setSearchResult]);

  return (
    <section>
      <Header title="Bebidas" search />
      <DrinksCategories />
      <DrinksComponent data={ searchResult } />
      <Footer />
    </section>
  );
}

export default Drinks;
