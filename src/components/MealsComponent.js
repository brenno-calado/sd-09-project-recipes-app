import React from 'react';
import { shape, string } from 'prop-types';

function MealsComponent({ data: { meals } }) {
  if (!meals) return <div>Loading...</div>;
  const maxArrayLength = 12;

  return (
    <main>
      { meals.map(({ strMeal, strMealThumb }, index) => (
        index < maxArrayLength ? (
          <button data-testid={ `${index}-recipe-card` } type="button" key={ strMeal }>
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
            />
          </button>
        ) : false
      )) }
    </main>
  );
}

MealsComponent.propTypes = { data: shape(
  { strMeal: string, strMealThumb: string },
) }.isRequired;

export default MealsComponent;
