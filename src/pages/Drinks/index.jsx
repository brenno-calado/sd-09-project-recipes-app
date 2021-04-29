import React, { useEffect, useContext } from 'react';
import { context } from '../../context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListCards from '../../components/ListDrinkCards';
import fetchApi from '../../services';

export default function Drinks() {
  const { drinks, setDrinks, setFilter } = useContext(context);

  useEffect(() => {
    const lengthOfList = 12;
    fetchApi('cocktail', 'name', '').then((res) => {
      const fetchDrinks = res.drinks
        .filter((drink) => res.drinks.indexOf(drink) < lengthOfList);
      setDrinks(fetchDrinks);
    });
  }, []);

  return (
    <>
      <Header title="Bebidas" canFind setFilter={ setFilter } />
      <span>Drinks</span>
      {drinks && <ListCards items={ drinks } />}
      <Footer />
    </>
  );
}
