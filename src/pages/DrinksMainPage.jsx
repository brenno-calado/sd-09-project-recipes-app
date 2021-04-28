import React, { useContext } from 'react';
import DrinksList from '../components/DrinksList';
import Footer from '../components/Footer';
import RecipeCategoriesFilters from '../components/RecipeCategoriesFilters';
import RecipesContext from '../Provider/RecipesContext';

function DrinksMainPage() {
  const { fetchingDrinks } = useContext(RecipesContext);

  if (fetchingDrinks) return <h1>Loading...</h1>;
  return (
    <div>
      <RecipeCategoriesFilters type="drinks" />
      <DrinksList />
      <Footer />
    </div>
  );
}

export default DrinksMainPage;
