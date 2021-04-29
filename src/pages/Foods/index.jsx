import React, { useEffect, useContext } from 'react';
import { context } from '../../context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import fetchApi from '../../services';
import ListCards from '../../components/ListFoodCards ';

export default function Foods() {
  const { foods, setFoods, setFilter } = useContext(context);

  useEffect(() => {
    const lengthOfList = 12;
    fetchApi('food', 'name', '').then((res) => {
      const fetchFoods = res.meals
        .filter((food) => res.meals.indexOf(food) < lengthOfList);
      setFoods(fetchFoods);
    });
  }, []);

  return (
    <>
      <Header title="Comidas" canFind setFilter={ setFilter } />
      {foods && <ListCards items={ foods } />}
      <Footer />
    </>
  );
}
