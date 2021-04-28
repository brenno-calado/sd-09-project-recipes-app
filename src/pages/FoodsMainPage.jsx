import React, { useContext } from 'react';
import FoodsList from '../components/FoodsList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCategoriesFilters from '../components/RecipeCategoriesFilters';
import RecipesContext from '../Provider/RecipesContext';

function FoodsMainPage() {
  const { fetchingFoods } = useContext(RecipesContext);

  if (fetchingFoods) return <h1>Loading...</h1>;
  return (
    <div>
      <Header title="Comidas" />
      <RecipeCategoriesFilters type="meals" />
      <FoodsList />
      <Footer />
    </div>
  );
}

export default FoodsMainPage;
