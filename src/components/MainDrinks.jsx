import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from './Header';
import MainButtons from './MainButtons';
import DrinksCards from './DrinksCards';
import Footer from './Footer';
import MealContext from '../context/MealContext';

function MainDrinks() {
  const { foods } = useContext(MealContext);

  return (
    <>
      {foods.length === 1
        ? <Redirect to={ `/bebidas/${foods[0].idDrink}` } /> : null}

      <Header textProp="Bebidas" />

      <MainButtons />

      <DrinksCards />

      <Footer />
    </>
  );
}

export default MainDrinks;
