<<<<<<< HEAD
import React, { useEffect, useContext } from 'react';
import { context } from '../../context';
=======
import React from 'react';
import { Redirect } from 'react-router';
>>>>>>> main-group-27-develop
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListCards from '../../components/ListDrinkCards';
import fetchApi from '../../services';
import CategoriesButtons from '../../components/SearchButtons';

export default function Drinks() {
<<<<<<< HEAD
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
  }, [setDrinks, setCategories]);

  return (
    <>
      <Header title="Bebidas" canFind setFilter={ setFilter } />
      <span>Drinks</span>
      {categories && <CategoriesButtons type="drink" />}
      {drinks && <ListCards items={ drinks } />}
=======
  const { drinks, setFilter } = useDrinkApi();
  const uniqueRecipe = drinks && drinks.length === 1;
  const moreThanOneRecipes = drinks && drinks.length > 1;
  return (
    <>
      <Header title="Bebidas" canFind setFilter={ setFilter } />
      {moreThanOneRecipes && <ListCards items={ drinks } />}
      {uniqueRecipe && <Redirect to={ `/bebidas/${drinks[0].idDrink}` } />}
>>>>>>> main-group-27-develop
      <Footer />
    </>
  );
}
