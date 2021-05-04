import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import { context } from '../../context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListCards from '../../components/ListDrinkCards';
import fetchApi from '../../services';
import useDrinkApi from '../../hooks/useDrinkApi';
import CategoriesButtons from '../../components/SearchButtons';

export default function Drinks() {
  const {
    drinks, setDrinks, categories, setCategories, ingredientOn, setIngreditOn,
  } = useContext(context);
  let selector = 'name';
  let searchName = '';

  const { drinks: drinksHook, setFilter: setFilterHook } = useDrinkApi();
  const uniqueRecipe = drinks && drinks.length === 1;
  const moreThanOneRecipes = drinks && drinks.length > 1;

  useEffect(() => {
    if (ingredientOn !== '') {
      selector = 'ingredient';
      searchName = ingredientOn;
    }

    const lengthOfList = 12;
    fetchApi('cocktail', selector, searchName).then((res) => {
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

    setIngreditOn('');
  }, [setDrinks, setCategories]);

  return (
    <>
      <Header title="Bebidas" canFind setFilter={ setFilterHook } />
      {categories && <CategoriesButtons type="drink" />}
      {moreThanOneRecipes && <ListCards items={ drinksHook } />}
      {uniqueRecipe && <Redirect to={ `/bebidas/${drinksHook[0].idDrink}` } />}
      <Footer />
    </>
  );
}
