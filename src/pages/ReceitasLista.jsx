import React, { useContext, useState } from 'react';
import CardDoneFavorite from '../components/CardDoneFavorite';
import Header from '../components/Header';
import { RecipesContext } from '../context';

function ReceitasLista() {
  const {
    values: { favoriteRecipes: faviRecContext },
  } = useContext(RecipesContext);

  const [favoriteRecipes] = useState(faviRecContext || []);

  return (
    <>
      <Header />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {
        favoriteRecipes.map((recipe, index) => (
          <CardDoneFavorite data={ recipe } index={ index } key={ recipe.name } />
        ))
      }
    </>
  );
}

export default ReceitasLista;
