import React from 'react';
import { shape, string } from 'prop-types';
import { Redirect } from 'react-router-dom';

function MealsComponent({ data: { meals } }) {
  if (meals === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (!meals) return <div>Loading...</div>;
  if (meals.length === 1) return <Redirect to={ `comidas/${meals[0].idMeal}` } />;
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
