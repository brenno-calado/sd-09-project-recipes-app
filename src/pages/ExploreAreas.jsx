import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodsList from '../components/FoodsList';
import RecipeAreasFilter from '../components/RecipeAreasFilters';

function ExploreAreas() {
  return (
    <div>
      <Header title="Explorar Origem" />
      <RecipeAreasFilter />
      <FoodsList />
      <Footer />
    </div>
  );
}

export default ExploreAreas;
