import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExploreBeveragesIngredients extends React.Component {
  render() {
    return (
      <div>
        <Header title="Explorar Ingredientes" />
        <p>Esta é a pagina de explorar bebidas/ingredientes.</p>
        <Footer />
      </div>
    );
  }
}

export default ExploreBeveragesIngredients;
