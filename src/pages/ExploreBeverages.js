import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExploreBeverages extends React.Component {
  render() {
    return (
      <div>
        <Header title="Explorar Bebidas" />
        <p>Esta é a pagina de explorar bebidas.</p>
        <Footer />
      </div>
    );
  }
}

export default ExploreBeverages;
