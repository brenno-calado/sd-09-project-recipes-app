import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExploreFoodsIngredients extends React.Component {
  render() {
    return (
      <div>
        <Header title="Explorar Ingredientes" />
        <p>Esta é a pagina de explorar comidas/ingredientes.</p>
        <Footer />
      </div>
    );
  }
}

export default ExploreFoodsIngredients;
