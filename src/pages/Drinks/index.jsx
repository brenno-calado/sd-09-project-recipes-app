import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListCards from '../../components/ListDrinkCards';
import useDrinkApi from '../../hooks/useDrinkApi';

export default function Drinks() {
  const { drinks, setFilter } = useDrinkApi();
  return (
    <>
      <Header title="Bebidas" canFind setFilter={ setFilter } />
      <span>Drinks</span>
      {drinks && <ListCards items={ drinks } />}
      <Footer />
    </>
  );
}
