import React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

export default function MainPageDrink() {
  return (
    <>
      <Header page="Bebidas" search={ { searchBtn: true, searchFor: 'drink' } } />
      <Footer />
    </>
  );
}
