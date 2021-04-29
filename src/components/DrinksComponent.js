import React, { useContext } from 'react';
import { shape, string } from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Context } from '../context/Context';

function DrinksComponent({ data: { drinks } }) {
  const { isSearch } = useContext(Context);

  if (drinks === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
  if (!drinks) return <div>Loading...</div>;
  if (isSearch && drinks.length === 1) {
    return <Redirect to={ `bebidas/${drinks[0].idDrink}` } />;
  }
  const maxArrayLength = 12;

  return (
    <main>
      { drinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
        index < maxArrayLength ? (
          <Link to={ `/bebidas/${idDrink}` } key={ idDrink }>
            <button data-testid={ `${index}-recipe-card` } type="button">
              <img
                data-testid={ `${index}-card-img` }
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
            </button>
          </Link>
        ) : false
      )) }
    </main>
  );
}

DrinksComponent.propTypes = { data: shape(
  { strDrink: string, strDrinkThumb: string },
) }.isRequired;

export default DrinksComponent;
