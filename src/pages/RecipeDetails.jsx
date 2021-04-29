import React, { useContext, useEffect, useState } from 'react';
import Details from '../components/Details';
import MealsAndDrinkContext from '../context/MealsAndDrinkContext';
import { fetchOneMeal, fetchOneDrink } from '../services/api';

function RecipeDetails() {
  const { page } = useContext(MealsAndDrinkContext);
  const [details, setDetails] = useState();

  function getIdFromURL() {
    const path = window.location.pathname;
    const magicNum = 9;
    return path.substr(magicNum);
  }

  useEffect(() => {
    async function handleSearch() {
      const urlId = getIdFromURL();
      let found = {};
      if (page === 'comidas') {
        found = await fetchOneMeal(urlId);
      }
      if (page === 'bebidas') {
        found = await fetchOneDrink(urlId);
      }
      setDetails(found[0]);
    }
    handleSearch();
  }, [page]);

  return (
    <section>
      <h1>RECIPE DETAILS</h1>
      <div>
        {!details ? <p>loading</p> : <Details recipe={ details } />}
      </div>
    </section>
  );
}

export default RecipeDetails;
