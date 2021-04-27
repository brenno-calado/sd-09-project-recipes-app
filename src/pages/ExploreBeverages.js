import React from 'react';
import ExploreButtonsDrinks from '../components/ExploreButtonsDrinks';
import Header from '../components/Header';
import Footer from '../components/Footer';

class ExploreBeverages extends React.Component {
  render() {
    return (
      <div>
        <Header title="Explorar Bebidas" />
        <p>Esta é a pagina de explorar bebidas.</p>
        <ExploreButtonsDrinks />
        <Footer />
      </div>
    );
  }
}

export default ExploreBeverages;
