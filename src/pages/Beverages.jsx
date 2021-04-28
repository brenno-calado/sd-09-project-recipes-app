import React from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

function Beverages() {
  return (
    <div>
      <Header title="Explorar Bebidas" searchBtn />
      <Cards />
      <Footer />
    </div>
  );
}

export default Beverages;
