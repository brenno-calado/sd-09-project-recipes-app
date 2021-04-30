import React, { useEffect, useState } from 'react';
import Details from '../components/Details';
import { fetchOneMeal, fetchOneDrink } from '../services/api';
import { getIdFromURL, getPageFromURL } from '../services/others';

function RecipeDetails() {
  const [recipe, setRecipe] = useState();
  const [recomendedList, setRecomendedList] = useState();

  useEffect(() => {
    async function fetchOne() {
      const urlId = getIdFromURL();
      let found = {};
      if (getPageFromURL()) {
        found = await fetchOneMeal(urlId);
      } else {
        found = await fetchOneDrink(urlId);
      }
      setRecipe(found[0]);
    }
    fetchOne();
  }, []);

  const detailsContext = { recipe, recomendedList, setRecomendedList };

  return (
    <section>
      <h1>RECIPE DETAILS</h1>
      <div>
        {!recipe ? <p>loading</p> : (
          <div>
            <Details detailsContext={ detailsContext } />
          </div>
        )}
      </div>
    </section>
  );
}

export default RecipeDetails;
