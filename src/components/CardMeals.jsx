import React, { useContext } from 'react';
import MealsContext from '../context/MealsContext';

function CardMeals() {
  const {
    values: {
        meals,
    },
  } = useContext(MealsContext);

  const maxCards = 12;

  if (meals === undefined) return '';

  return (
    <section>
      {meals.map(({ strMeal, strMealThumb }, index) => {
        if (index >= maxCards) return '';
        return (
          <div key={ strMeal } data-testid={ `${index}-recipe-card` }>
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{strMeal}</p>
          </div>
        );
      })}
    </section>
  );
}

export default CardMeals;