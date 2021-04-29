import React from 'react';
import { Redirect } from 'react-router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useFoodApi from '../../hooks/useFoodApi';
import ListCards from '../../components/ListFoodCards ';

export default function Foods() {
  const { foods, setFilter } = useFoodApi();
  const uniqueRecipe = foods && foods.length === 1;
  const moreThanOneRecipes = foods && foods.length > 1;
  return (
    <>
      <Header title="Comidas" canFind setFilter={ setFilter } />
      {moreThanOneRecipes && <ListCards items={ foods } />}
      {uniqueRecipe && <Redirect to={ `/comidas/${foods[0].idMeal}` } />}
      <Footer />
    </>
  );
}
