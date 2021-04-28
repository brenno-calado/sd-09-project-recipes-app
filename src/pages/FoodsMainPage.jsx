import React, { useContext } from 'react';
import FoodsList from '../components/FoodsList';
import Footer from '../components/Footer';
import RecipeCategoriesFilters from '../components/RecipeCategoriesFilters';
import RecipesContext from '../Provider/RecipesContext';

function FoodsMainPage() {
  const { fetchingFoods } = useContext(RecipesContext);

  if (fetchingFoods) return <h1>Loading...</h1>;
  return (
    <div>
      <RecipeCategoriesFilters type="meals" />
      <FoodsList />
      <Footer />
    </div>
  );
}

export default FoodsMainPage;
