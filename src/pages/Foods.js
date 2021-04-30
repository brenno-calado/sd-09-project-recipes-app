import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import FooterMenu from '../components/FooterMenu';
import { fetchMealsApi, fetchMealsCategories, fetchMealsByCategory } from '../services';
import '../App.css';
import MealCards from '../components/MealCards';

import { receiveDataMeal, receiveCategoryMeal } from '../redux/actions';
import SearchBar from '../components/SearchBar';
import useRouter from '../hooks/router';

function Foods() {
  const [loading, isFetching] = useState(true);
  const [categoryBtn, getCategory] = useState(undefined);

  const router = useRouter();

  console.log(router.pathname);

  const [lastCategory, checkCategory] = useState(undefined);

  const meals = useSelector((state) => state.foodReducer.meals);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.foodReducer.category);

  useEffect(() => {
    async function cardMount(categoryType) {
      if (categoryType) {
        isFetching(true);
        const number12 = 12;
        const number5 = 5;

        const categoryMeals = await fetchMealsCategories();
        const dataMeals = await fetchMealsByCategory(categoryType);

        const categoryResult = categoryMeals.slice(0, number5);
        const mealResult = dataMeals.slice(0, number12);

        dispatch(receiveDataMeal(mealResult));
        dispatch(receiveCategoryMeal(categoryResult));

        return isFetching(false);
      }

      const number12 = 12;
      const number5 = 5;

      const categoryMeals = await fetchMealsCategories();
      const dataMeals = await fetchMealsApi();

      const categoryResult = categoryMeals.slice(0, number5);
      const mealResult = dataMeals.slice(0, number12);

      dispatch(receiveDataMeal(mealResult));
      dispatch(receiveCategoryMeal(categoryResult));

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
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.' );
  }

  function foodCardsRender() {
    if (meals) {
      return (
        MealCards(category, meals, categoryCheck)
      );
    } if (!meals) {
      fetchAlert();
    }
  }

  return (
    <div className="test2">
      <SearchBar />
      { loading ? <h1> Loading...</h1> : foodCardsRender() }
      <FooterMenu />
    </div>
  );
}

export default connect()(Foods);
