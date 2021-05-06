import React, { useState, useEffect } from 'react';
import './InProgress.css';
import { useParams } from 'react-router-dom';
import { Container, Jumbotron } from 'react-bootstrap';
import { getPageFromURL } from '../services/others';
import { fetchOneMeal, fetchOneDrink } from '../services/api';
import DetailsBtnFavoriteRecipe from '../components/DetailsBtnFavoriteRecipe';
import DetailsBtnShareRecipeInProgress
  from '../components/in-progress/DetailsBtnShareRecipeInProgress';
import IngredientsInProgress from '../components/in-progress/IngredientsInProgress';
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
        <Jumbotron>
          <Container>
            <InProgressHeaderDetails detailsContext={ props } />
            <DetailsBtnShareRecipeInProgress detailsContext={ props } />
            <DetailsBtnFavoriteRecipe detailsContext={ props } />
            <IngredientsInProgress detailsContext={ props } />
          </Container>
        </Jumbotron>
      )
  );
}

export default InProgress;
