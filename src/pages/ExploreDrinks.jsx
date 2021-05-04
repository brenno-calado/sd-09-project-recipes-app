import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreDrinksIngredientsButton
  from '../components/buttons/explore/ExploreDrinksIngredientsBtn';
import SurpriseMeBtn from '../components/buttons/explore/SurpriseMeBtn';

function ExploreDrinks() {
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <main className="buttons-container">
        <ExploreDrinksIngredientsButton />
        <SurpriseMeBtn />
      </main>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
