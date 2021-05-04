import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainCards from '../components/MainCards';

function Foods() {
  return (
    <div>
      <Header title="Comidas" />
      <main className="main-container">
        <MainCards />
      </main>
      <Footer />
    </div>
  );
}

export default Foods;
