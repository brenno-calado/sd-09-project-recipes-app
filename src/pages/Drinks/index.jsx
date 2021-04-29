import React, { useEffect, useContext } from 'react';
import { context } from '../../context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListCards from '../../components/ListDrinkCards';
import fetchApi from '../../services';
import CategoriesButtons from '../../components/SearchButtons';

export default function Drinks() {
  const {
    drinks, setDrinks, setFilter, categories, setCategories,
  } = useContext(context);

  useEffect(() => {
    const lengthOfList = 12;
    fetchApi('cocktail', 'name', '').then((res) => {
      const fetchDrinks = res.drinks
        .filter((drink) => res.drinks.indexOf(drink) < lengthOfList);
      setDrinks(fetchDrinks);
    });

    const lengthOfCategories = 5;
    fetchApi('cocktail', 'categoriesList', '').then((res) => {
      const fetchCategories = res.drinks
        .filter((drink) => res.drinks.indexOf(drink) < lengthOfCategories);
      setCategories(fetchCategories);
    });
  }, []);

  return (
    <>
      <Header title="Bebidas" canFind setFilter={ setFilter } />
      <span>Drinks</span>
      {categories && <CategoriesButtons />}
      {drinks && <ListCards items={ drinks } />}
      <Footer />
    </>
  );
}
