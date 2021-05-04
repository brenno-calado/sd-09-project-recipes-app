import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExploreFoodsButton from '../components/buttons/explore/ExploreFoodsButton';
import ExploreDrinksButton from '../components/buttons/explore/ExploreDrinksButton';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <main className="buttons-container">
        <ExploreFoodsButton />
        <ExploreDrinksButton />
      </main>
      <Footer />
    </div>
  );
}

export default Explore;
