import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import { context } from '../../context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ListCards from '../../components/ListFoodCards ';
import fetchApi from '../../services';
import CategoriesButtons from '../../components/SearchButtons';

export default function Foods() {
  const {
    foods, setFoods, categories, setCategories,
  } = useContext(context);

  const { foods: foodsHook, setFilter: setFilterHook } = useFoodApi();
  const uniqueRecipe = foods && foods.length === 1;
  const moreThanOneRecipes = foods && foods.length > 1;

  useEffect(() => {
    const lengthOfList = 12;
    fetchApi('food', 'name', '').then((res) => {
      const fetchFoods = res.meals
        .filter((food) => res.meals.indexOf(food) < lengthOfList);
      setFoods(fetchFoods);
    });

    const lengthOfCategories = 5;
    fetchApi('food', 'categoriesList', '').then((res) => {
      const fetchCategories = res.meals
        .filter((food) => res.meals.indexOf(food) < lengthOfCategories);
      setCategories(fetchCategories);
    });
  }, [setFoods, setCategories]);

  return (
    <>
      <Header title="Comidas" canFind setFilter={ setFilterHook } />
      {categories && <CategoriesButtons type="food" />}
      {foods && <ListCards items={ foods } />}
      {moreThanOneRecipes && <ListCards items={ foodsHook } />}
      {uniqueRecipe && <Redirect to={ `/comidas/${foodsHook[0].idMeal}` } />}
      <Footer />
    </>
  );
}
