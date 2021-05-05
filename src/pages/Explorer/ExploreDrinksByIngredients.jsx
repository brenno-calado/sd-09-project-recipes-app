import React from 'react';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';

function ExploreDrinksByIngredients() {
  return (
    <div>
      <Header title="Explorar Ingredientes" isSearchEnable={ false } />
      <p>Explore Drinks by Ingredients</p>
      <Footer />
    </div>
  );
}

export default ExploreDrinksByIngredients;
