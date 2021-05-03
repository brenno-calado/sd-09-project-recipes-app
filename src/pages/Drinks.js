import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import FooterMenu from '../components/FooterMenu';
import {
  fetchDrinksApi,
  fetchDrinksCategories,
  fetchDrinksByCategory } from '../services';
import '../App.css';
import DrinkCards from '../components/DrinkCards';
import { receiveCategoryDrink, receiveDataDrink } from '../redux/actions';
import Header from '../components/Header';

function Drinks() {
  const [loading, isFetching] = useState(true);
  const [categoryBtn, getCategory] = useState(undefined);
  const [lastCategory, checkCategory] = useState(undefined);

  const drinks = useSelector((state) => state.drinkReducer.drinks);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.drinkReducer.category);

  useEffect(() => {
    async function cardMount(categoryType) {
      if (categoryType) {
        isFetching(true);

        const number12 = 12;
        const number5 = 5;

        const categoryDrinks = await fetchDrinksCategories();
        const dataDrinks = await fetchDrinksByCategory(categoryType);

        const categoryResult = categoryDrinks.slice(0, number5);
        const dataResult = dataDrinks.slice(0, number12);

        dispatch(receiveDataDrink(dataResult));
        dispatch(receiveCategoryDrink(categoryResult));

        return isFetching(false);
      }

      const number12 = 12;
      const number5 = 5;

      const categoryDrinks = await fetchDrinksCategories();
      const dataDrinks = await fetchDrinksApi();

      const categoryResult = categoryDrinks.slice(0, number5);
      const drinkResult = dataDrinks.slice(0, number12);

      dispatch(receiveDataDrink(drinkResult));
      dispatch(receiveCategoryDrink(categoryResult));

      return isFetching(false);
    }
    cardMount(categoryBtn);
  }, [categoryBtn, lastCategory, dispatch]);

  async function categoryCheck(param) {
    if (lastCategory === param) {
      getCategory(undefined);
      checkCategory(undefined);
    } else {
      getCategory(param);
      checkCategory(param);
    }
  }

  function fetchAlert() {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  function drinksCardsRender() {
    if (drinks) {
      return (
        DrinkCards(category, drinks, categoryCheck)
      );
    } if (!drinks) {
      fetchAlert();
    }
  }

  return (
    <>
      <Header pageName="Bebidas" searchBtn />
      { loading ? <h1> Loading...</h1> : drinksCardsRender() }
      <FooterMenu />
    </>
  );
}

export default connect()(Drinks);
