import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import { RecipesContext } from '../context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Dropdown from '../components/Dropdown';

export default function ExplorarArea() {
  const {
    values: { isFetching, recipesResult, areaFilter },
  } = useContext(RecipesContext);
  const [recipes, setRecipes] = useState(recipesResult);

  useEffect(() => {
    if (areaFilter) {
      const filtered = recipesResult.filter(({ strArea }) => strArea === areaFilter);
      setRecipes(filtered);
    } else {
      setRecipes(recipesResult);
    }
  }, [areaFilter, recipesResult]);

  return !isFetching ? (
    <>
      <Header />
      <Dropdown data={ recipesResult } />
      <Card data={ recipes } />
      <Footer />
    </>
  ) : <Loading />;
}
