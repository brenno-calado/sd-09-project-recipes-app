import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import IngredientCard from '../Components/IngredientCard';

class ExploreDrinkByIng extends React.Component {
  render() {
    return (
      <div>
        <Header name="Explorar Ingredientes" />
        <IngredientCard name="Bebidas" />
        <Footer />
      </div>
    );
  }
}

export default ExploreDrinkByIng;
