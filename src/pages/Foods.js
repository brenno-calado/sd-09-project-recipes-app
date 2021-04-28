import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import FooterMenu from '../components/FooterMenu';
import { fetchMealsApi, fetchMealsCategories } from '../services';
import '../App.css';
import MealCards from '../components/MealCards';
import SearchBar from '../components/SearchBar';

export default function Foods() {
  const [data, getData] = useState([]);
  const [category, getCategory] = useState([]);
  const [loading, isFetching] = useState(true);

  async function cardMount() {
    const number12 = 12;
    const number5 = 5;

    const categoryMeals = await fetchMealsCategories();
    const dataMeals = await fetchMealsApi();

    isFetching(false);

    const categoryResult = categoryMeals.slice(0, number5);
    const mealResult = dataMeals.slice(0, number12);

    getCategory([
      ...categoryResult,
    ]);

    getData([
      ...mealResult,
    ]);
  }

  useEffect(() => {
    cardMount();
  }, []);

  return (
    <>
      <SearchBar />
      { loading ? <h1>Loading...</h1> : MealCards(category, data)}
      <FooterMenu />
    </>
  );
}
