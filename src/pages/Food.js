import React, { useState, useEffect } from 'react';

import Menu from '../components/Menu';
import Header from '../components/Header';
import {
  getFoodAll,
  getFoodByCategory,
  getFoodsCategories,
} from '../services/foodAPI.js';
import RecipeCard from '../components/RecipeCard';
import FilterButtons from '../components/FilterButtons';

const Food = () => {
  const [meals, setMeals] = useState({ mealsList: [], isFetching: false });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('All');

  const requestMeals = async () => {
    try {
      setMeals({ ...meals, isFetching: true });
      const mealsObject = category === 'All'
        ? await getFoodAll()
        : await getFoodByCategory(category);
      const mealsList = mealsObject.meals;
      const listSize = 12;
      setMeals({ mealsList: mealsList.slice(0, listSize), isFetching: false });
    } catch (error) {
      console.log(error);
    }
  };

  const requestCategories = async () => {
    try {
      const foodCategories = await getFoodsCategories();
      const categoriesSize = 5;
      const categoiesList = foodCategories.meals;
      setCategories(categoiesList.slice(0, categoriesSize));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestMeals();
  }, [category]);

  useEffect(() => {
    requestCategories();
  }, []);

  const handleFilter = (filterName) => (
    filterName !== 'All' && category !== filterName
      ? setCategory(filterName)
      : setCategory('All'));

  return (
    <div>
      <Header title="Comidas" />
      {categories && (
        <FilterButtons categories={ categories } handleFilter={ handleFilter } />
      )}
      {meals.isFetching ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          {meals.mealsList.map((meal, index) => (
            <RecipeCard
              key={ meal.idMeal }
              recipeName={ meal.strMeal }
              recipeImage={ meal.strMealThumb }
              index={ index }
            />
          ))}
        </div>
      )}
      <Menu />
    </div>
  );
};

export default Food;
