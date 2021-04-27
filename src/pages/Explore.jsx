import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ExploreFoodsButton from '../components/buttons/explore/ExploreFoodsButton';
import ExploreDrinksButton from '../components/buttons/explore/ExploreDrinksButton';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <ExploreFoodsButton />
      <ExploreDrinksButton />
      <Footer />
    </div>
  );
}

export default Explore;
