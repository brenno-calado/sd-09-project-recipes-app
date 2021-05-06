import React from 'react';
import {
  requestDrinks,
  requestDrinksByCategory,
  requestMeals,
  requestMealsByCategory,
} from '../../services/api';
import './btn.css';

const requestApi = (category, setItems, type, filters) => {
  const { lastFilter, setLastFilter } = filters;
  if (category !== lastFilter) {
    if (type === 'drinks') {
      if (category === 'All') {
        requestDrinks().then((response) => setItems(response.drinks));
      } else {
        requestDrinksByCategory(category)
          .then((response) => setItems(response.drinks));
      }
    }
    if (type === 'meals') {
      if (category === 'All') {
        requestMeals().then((response) => setItems(response.meals));
      } else {
        requestMealsByCategory(category)
          .then((response) => setItems(response.meals));
      }
    }
  } else if (type === 'drinks') {
    requestDrinks().then((response) => setItems(response.drinks));
  } else if (type === 'meals') {
    requestMeals().then((response) => setItems(response.meals));
  }
  setLastFilter(category);
};

function index({ category, setItems, type, lastFilter, setLastFilter }) {
  const filters = { lastFilter, setLastFilter };
  return (
    <button
      className="btn-category"
      type="button"
      data-testid={ `${category}-category-filter` }
      onClick={ () => requestApi(category, setItems, type, filters) }
    >
      { category }
    </button>
  );
}

export default index;
