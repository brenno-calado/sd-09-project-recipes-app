import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainCards from '../components/MainCards';
import CategoriesBtn from '../components/buttons/categories/CategoriesBtn';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" />
      <main className="main-container">
        <CategoriesBtn />
        <MainCards />
      </main>
      <Footer />
    </div>
  );
}

export default Drinks;
