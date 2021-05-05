import React from 'react';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';

function ExploreFoodByIngredients() {
  return (
    <div>
      <Header title="Explorar Ingredientes" isSearchEnable={ false } />
      <p>Explore Food by Ingredient</p>
      <Footer />
    </div>

  );
}

export default ExploreFoodByIngredients;
