import React, { useState, useEffect } from 'react';
import './InProgress.css';
import { useParams } from 'react-router-dom';
import { getPageFromURL } from '../services/others';
import { fetchOneMeal, fetchOneDrink } from '../services/api';
import DetailsBtnShareRecipe from '../components/DetailsBtnShareRecipe';
import DetailsBtnFavoriteRecipe from '../components/DetailsBtnFavoriteRecipe';
import IngredientsInProgress from '../components/in-progress/IngredientsInProgress';
import DetailsBtnFinishRecipeInProgress
  from '../components/in-progress/DetailsBtnFinishRecipeInProgress';
import InProgressHeaderDetails from '../components/in-progress/InProgressHeaderDetails';

function InProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    async function fetchOne() {
      const urlId = id;
      let found;
      if (getPageFromURL()) {
        found = await fetchOneMeal(urlId);
      } else {
        found = await fetchOneDrink(urlId);
      }
      setRecipe(found[0]);
    }
    fetchOne();
  }, [id]);

  const props = { recipe };

  return (
    !recipe
      ? <p>loading</p>
      : (
        <main>
          <InProgressHeaderDetails detailsContext={ props } />
          <DetailsBtnShareRecipe detailsContext={ props } />
          <DetailsBtnFavoriteRecipe detailsContext={ props } />
          <IngredientsInProgress detailsContext={ props } />
          <DetailsBtnFinishRecipeInProgress />
        </main>
      )
  );
}

export default InProgress;
