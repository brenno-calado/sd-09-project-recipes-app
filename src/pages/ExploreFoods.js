import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import { fetchMealsRandom } from '../services';
import useRouter from '../hooks/router';

async function surpriseID() {
  const randonID = await fetchMealsRandom();
  const { idMeal } = randonID[0];
  return idMeal;
}

function ExploreFoods() {
  const route = useRouter();
  return (
    <>
      <Header pageName="Explorar" searchBtn={ false } />
      <div className="explore-container">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            className="explore-cards"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            className="explore-cards"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>

        <button
          type="button"
          className="explore-cards"
          data-testid="explore-surprise"
          onClick={ async () => {
            route.push(`/comidas/${await surpriseID()}`);
          } }
        >
          Me Surpreenda!
        </button>

      </div>
      <FooterMenu />
    </>
  );
}

export default ExploreFoods;
