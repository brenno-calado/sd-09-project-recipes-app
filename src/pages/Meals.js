import React, { useContext, useEffect } from 'react';
import { Header, MealsCategories, MealsComponent, Footer } from '../components';
import { Context } from '../context/Context';
import { fecthForName } from '../services/api';

function Meals() {
  const { searchResult, setSearchResult } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      setSearchResult(await fecthForName('', true));
    };
    fetchData();
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
