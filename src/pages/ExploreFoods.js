import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExploreFoods extends React.Component {
  render() {
    return (
      <div>
        <Header title="Explorar Comidas" />
        <p>Esta é a pagina de explorar comidas.</p>
        <Footer />
      </div>
    );
  }
}

export default ExploreFoods;
