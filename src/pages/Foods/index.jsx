import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListOfFoods from '../../components/ListOfFoods';

function Foods() {
  return (
    <>
      <Header title="Comidas" canFind />
      <ListOfFoods />
      <Footer />
    </>
  );
}

export default Foods;
