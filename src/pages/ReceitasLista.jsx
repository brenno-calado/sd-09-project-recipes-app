import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CardDoneFavorite from '../components/CardDoneFavorite';
import Header from '../components/Header';
import { RecipesContext } from '../context';
import '../styles/ReceitasLista.css';

function ReceitasLista() {
  const {
    values: {
      favoriteRecipes: faviRecContext,
      doneRecipes: doneRecContext,
    },
  } = useContext(RecipesContext);

  const [favoriteRecipes, setFavoriteRecipes] = useState(faviRecContext || []);
  const [doneRecipes] = useState(doneRecContext || []);
  const [filter, setFilter] = useState('');

  const { pathname } = useLocation();

  useEffect(() => {
    if (faviRecContext) {
      const filtered = !filter.length
        ? faviRecContext
        : faviRecContext.filter(({ type }) => type === filter);
      setFavoriteRecipes(filtered);
    }
  }, [faviRecContext, filter]);

  return (
    <>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('comida') }
      >
        Food

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('bebida') }
      >
        Drinks

      </button>
      <section className="cards-done">
        {
          pathname.includes('feitas')
            ? doneRecipes.map((recipe, index) => (
              <CardDoneFavorite data={ recipe } index={ index } key={ recipe.name } />
            ))
            : favoriteRecipes.map((recipe, index) => (
              <CardDoneFavorite data={ recipe } index={ index } key={ recipe.name } />
            ))
        }
      </section>
    </>
  );
}

export default ReceitasLista;
