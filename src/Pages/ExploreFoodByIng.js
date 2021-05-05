import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import IngredientCard from '../Components/IngredientCard';

class ExploreFoodByIng extends React.Component {
  render() {
    return (
      <div>
        <Header name="Explorar Ingredientes" />
        <IngredientCard name="Comidas" />
        <Footer />
      </div>
    );
  }
}

export default ExploreFoodByIng;
