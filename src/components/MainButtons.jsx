import React, { useState, useEffect } from 'react';
import { getMealByCategory } from '../services/MealFetch';
import { getDrinkByCategory } from '../services/DrinkFetch';

function MainButtons() {
  const [categorys, setCategory] = useState([]);
  const cardsLimit = 5;

  useEffect(() => {
    if (window.location.href.match(/comidas$/)) {
      getMealByCategory().then((response) => setCategory(response));
    }

    if (window.location.href.match(/bebidas$/)) {
      getDrinkByCategory().then((response) => setCategory(response));
    }
  }, []);

  return (
    <>
      <button
        type="button"
      >
        All
      </button>
      {categorys.slice(0, cardsLimit).map((category) => (
        <button
          key={ Math.random() }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
        >
          { category.strCategory }
        </button>
      ))}
    </>
  );
}

export default MainButtons;
