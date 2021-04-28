import React from 'react';
import { shape, string } from 'prop-types';
import { Redirect } from 'react-router-dom';

function DrinksComponent({ data: { drinks } }) {
  if (drinks === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (!drinks) return <div>Loading...</div>;
  if (drinks.length === 1) return <Redirect to={ `bebidas/${drinks[0].idDrink}` } />;
  const maxArrayLength = 12;

  return (
    <main>
      { drinks.map(({ strDrink, strDrinkThumb }, index) => (
        index < maxArrayLength ? (
          <button data-testid={ `${index}-recipe-card` } type="button" key={ strDrink }>
            <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ strDrink }
            />
          </button>
        ) : false
      )) }
    </main>
  );
}

DrinksComponent.propTypes = { data: shape(
  { strDrink: string, strDrinkThumb: string },
) }.isRequired;

export default DrinksComponent;
