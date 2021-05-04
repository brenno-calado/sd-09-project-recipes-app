import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainCards from '../components/MainCards';

function Drinks() {
  return (
    <div>
      <Header title="Bebidas" />
      <main className="main-container">
        <MainCards />
      </main>
      <Footer />
    </div>
  );
}

export default Drinks;
