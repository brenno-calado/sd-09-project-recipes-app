import React, { useContext } from 'react';
import DrinksList from '../components/DrinksList';
import RecipesContext from '../Provider/RecipesContext';

function DrinksMainPage() {
  const { fetchingDrinks } = useContext(RecipesContext);

  if (fetchingDrinks) return <h1>Loading...</h1>;
  return (
    <div>
      <DrinksList />
    </div>
  );
}

export default DrinksMainPage;
