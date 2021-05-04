import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';
import { fetchDrinksRandom } from '../services';
import useRouter from '../hooks/router';

async function surpriseID() {
  const randonID = await fetchDrinksRandom();
  const { idDrink } = randonID[0];
  return idDrink;
}

function ExploreDrinks() {
  const route = useRouter();
  return (
    <>
      <Header pageName="Explorar" searchBtn={ false } />
      <div className="explore-container">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            className="explore-cards"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>

        <button
          type="button"
          className="explore-cards"
          data-testid="explore-surprise"
          onClick={ async () => {
            route.push(`/bebidas/${await surpriseID()}`);
          } }
        >
          Me Surpreenda!
        </button>

      </div>
      <FooterMenu />
    </>
  );
}

export default ExploreDrinks;
