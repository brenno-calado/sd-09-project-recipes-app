import React, { useEffect, useContext } from 'react';
import { context } from '../../context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import fetchApi from '../../services';
import ListCards from '../../components/ListFoodCards ';
import CategoriesButtons from '../../components/SearchButtons';

let categories = [];

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

  useEffect(() => {
    const lengthOfCategories = 5;
    fetchApi('food', 'categoriesList', '').then((res) => {
      console.log(res);
      categories = res.meals
        .filter((food) => res.meals.indexOf(food) < lengthOfCategories);
    });
  }, []);

  return (
    <>
      <Header title="Comidas" canFind setFilter={ setFilter } />
      { categories.length > 0 && <CategoriesButtons categories={ categories } />}
      {foods && <ListCards items={ foods } />}
      <Footer />
    </>
  );
}
