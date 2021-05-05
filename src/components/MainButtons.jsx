import React, { useState, useEffect, useContext } from 'react';
import { getMealCategorys, getMealsByCategory } from '../services/MealFetch';
import { getDrinkCategorys, getDrinkByCategory } from '../services/DrinkFetch';
import MealContext from '../context/MealContext';

function MainButtons() {
  const foodPage = window.location.href.match(/comidas$/);
  const drinkPage = window.location.href.match(/bebidas$/);
  const [categorys, setCategorys] = useState([]);
  const [filter, setFilter] = useState('');
  const { setFoods, drinkFilter, foodFilter } = useContext(MealContext);
  const filtersLimit = 5;

  function handleChange({ target: { name } }) {
    if (filter === name || name === 'all') {
      setFilter('');
      if (foodPage) {
        foodFilter();
      } else if (drinkPage) {
        drinkFilter();
      }
    } else {
      setFilter(name);
      if (foodPage) {
        getMealsByCategory(name).then((response) => setFoods(response));
      } else if (drinkPage) {
        getDrinkByCategory(name).then((response) => setFoods(response));
      }
    }
  }

  useEffect(() => {
    if (foodPage) {
      getMealCategorys().then((response) => setCategorys(response));
    }

    if (drinkPage) {
      getDrinkCategorys().then((response) => setCategorys(response));
    }
  });

  return (
    <>
      <button
        type="button"
        name="all"
        onClick={ handleChange }
        data-testid="All-category-filter"
      >
        All
      </button>
      {categorys.slice(0, filtersLimit).map((category) => (
        <button
          key={ Math.random() }
          type="button"
          name={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ handleChange }
        >
          { category.strCategory }
        </button>
      ))}
    </>
  );
}

export default MainButtons;
