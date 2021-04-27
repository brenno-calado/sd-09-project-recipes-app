import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreFoodsIngredientsBtn
  from '../components/buttons/explore/ExploreFoodsIngredientsBtn';
import ExploreFoodsAreaBtn from '../components/buttons/explore/ExploreFoodsAreaBtn';
import SurpriseMeBtn from '../components/buttons/explore/SurpriseMeBtn';

function ExploreFoods() {
  return (
    <div>
      <Header title="Explorar Comidas" />
      <ExploreFoodsIngredientsBtn />
      <ExploreFoodsAreaBtn />
      <SurpriseMeBtn />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
