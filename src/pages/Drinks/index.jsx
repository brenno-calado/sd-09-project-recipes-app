import React from 'react';
import { Redirect } from 'react-router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListCards from '../../components/ListDrinkCards';
import useDrinkApi from '../../hooks/useDrinkApi';

export default function Drinks() {
  const { drinks, setFilter } = useDrinkApi();
  const uniqueRecipe = drinks && drinks.length === 1;
  const moreThanOneRecipes = drinks && drinks.length > 1;
  return (
    <>
      <Header title="Bebidas" canFind setFilter={ setFilter } />
      {moreThanOneRecipes && <ListCards items={ drinks } />}
      {uniqueRecipe && <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />}
      <Footer />
    </>
  );
}
