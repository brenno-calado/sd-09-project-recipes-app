import React, { useContext, useEffect } from 'react';
import { Header, MealsCategories, MealsComponent, Footer } from '../components';
import { Context } from '../context/Context';
import { fecthForName } from '../services/api';

function Meals() {
  const {
    searchResult,
    setSearchResult,
  } = useContext(Context);

  useEffect(() => {
    const getData = async () => setSearchResult(await fecthForName('', true));
    getData();
  }, [setSearchResult]);

  return (
    <section>
      <Header title="Comidas" search />
      <MealsCategories />
      <MealsComponent data={ searchResult } />
      <Footer />
    </section>
  );
}

export default Meals;
