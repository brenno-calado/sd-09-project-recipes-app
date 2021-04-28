import React, { useContext } from 'react';
import DrinksList from '../components/DrinksList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCategoriesFilters from '../components/RecipeCategoriesFilters';
import RecipesContext from '../Provider/RecipesContext';

function DrinksMainPage() {
  const { fetchingDrinks } = useContext(RecipesContext);

  if (fetchingDrinks) return <h1>Loading...</h1>;
  return (
    <div>
      <Header title="Bebidas" />
      <RecipeCategoriesFilters type="drinks" />
      <DrinksList />
      <Footer />
    </div>
  );
}

export default DrinksMainPage;
