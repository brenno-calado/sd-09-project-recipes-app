import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainCards from '../components/MainCards';
import CategoriesBtn from '../components/buttons/categories/CategoriesBtn';

function Foods() {
  return (
    <div>
      <Header title="Comidas" />
      <main style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
        <CategoriesBtn />
        <MainCards />
      </main>
      <Footer />
    </div>
  );
}

export default Foods;
