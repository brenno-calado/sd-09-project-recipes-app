import React from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div>
      <Header title="Explorar Comidas" searchBtn />
      <Cards />
      <Footer />
    </div>
  );
}

export default Foods;
