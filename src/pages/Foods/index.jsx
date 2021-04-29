import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useFoodApi from '../../hooks/useFoodApi';
import ListCards from '../../components/ListFoodCards ';

export default function Foods() {
  const { foods, setFilter } = useFoodApi();
  console.log(foods);
  return (
    <>
      <Header title="Comidas" canFind setFilter={ setFilter } />
      {foods && <ListCards items={ foods } />}
      <Footer />
    </>
  );
}
