import React from 'react';
import Header from '../components/Header';
import CardMeals from '../components/CardMeals';
import Footer from '../components/Footer';
import SearchBarMeals from '../components/SearchBarMeals';

export default function Meals() {
  const searchIcon = true;
  return (
    <div>
      <Header title="Comidas" 
      component={ <SearchBarMeals /> } 
      searchIcon={ searchIcon } />
      <h6>comidas</h6>
      <CardMeals />
      <Footer />
    </div>
  );
}
