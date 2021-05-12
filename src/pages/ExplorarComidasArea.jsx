import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
// import MainButtons from '../components/MainButtons';
import FoodCards from '../components/FoodCards';
import Footer from '../components/Footer';
import MealContext from '../context/MealContext';
import AreaList from '../components/AreaList';

function MainFoods() {
  const { foods } = useContext(MealContext);

  return (
    <>
      {foods.length === 1
        ? <Redirect to={ `/comidas/${foods[0].idMeal}` } /> : null}

      <Header textProp="Explorar Origem" />

      <AreaList />

      <FoodCards />

      <Footer />
    </>
  );
}

export default MainFoods;
