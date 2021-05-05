import React from 'react';

import Header from '../components/Header';
import FooterMenu from '../components/FooterMenu';

function FoodsByIngredients() {
  return (
    <>
      <Header pageName="Explorar Ingredientes" />
      <h1>Foods Ingredients</h1>
      <FooterMenu />
    </>
  );
}

export default FoodsByIngredients;
