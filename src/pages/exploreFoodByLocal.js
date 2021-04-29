import React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

export default function ExploreFoodByOrigin() {
  return (
    <>
      <Header page="Explorar Origem" search={ { searchBtn: true, searchFor: 'food' } } />
      <Footer />
    </>
  );
}
