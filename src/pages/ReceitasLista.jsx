import React, { useContext } from 'react';
import CardDoneFavorite from '../components/CardDoneFavorite';
import Header from '../components/Header';
import { RecipesContext } from '../context';

function ReceitasLista() {
  const { values: { favoriteRecipes } } = useContext(RecipesContext);

  return (
    <>
      <Header />
      {
        favoriteRecipes.map((recipe, index) => (
          <CardDoneFavorite data={ recipe } index={ index } key={ recipe.name } />
        ))
      }
    </>
  );
}

export default ReceitasLista;
