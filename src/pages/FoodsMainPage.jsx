import React from 'react';
import FoodsList from '../components/FoodsList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCategoriesFilters from '../components/RecipeCategoriesFilters';

function FoodsMainPage() {
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
