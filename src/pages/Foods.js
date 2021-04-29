import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import FooterMenu from '../components/FooterMenu';
import { fetchMealsApi, fetchMealsCategories } from '../services';
import '../App.css';
import MealCards from '../components/MealCards';
import { receiveDataMeal, receiveCategoryMeal } from '../redux/actions';

function Foods() {
  const [loading, isFetching] = useState(true);

  const meals = useSelector((state) => state.foodReducer.meals);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.foodReducer.category);

  useEffect(() => {
    async function cardMount() {
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
    cardMount();
  }, [loading, dispatch]);

  return (
    <>
      { loading ? <h1> Loading...</h1> : MealCards(category, meals) }
      <FooterMenu />
    </>
  );
}

export default connect()(Foods);
