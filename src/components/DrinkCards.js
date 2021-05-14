import React from 'react';

import { Link } from 'react-router-dom';

export default function DrinkCards(categories, drinks, categoryCheck) {
  const numberOfDrinks = 12;
  function renderCards(drink, index) {
    return (
      <Link
        key={ drink.idDrink }
        to={ `/bebidas/${drink.idDrink}` }
      >
        <div
          key={ drink.idDrink }
          data-testid={ `${index}-recipe-card` }
          className="card"
          style={ {
            width: '15rem',
            alignItems: 'center',
            marginBottom: '5px',
            marginTop: '10px  ' } }
        >
          <img
            src={ drink.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt={ `${drink.strDrink} recipe` }
            className="card-img-top"
            style={ { width: '14rem', margin: '4px' } }
          />
          <h5
            data-testid={ `${index}-card-name` }
            className="card-title"
          >
            {drink.strDrink}
          </h5>
        </div>
      </Link>
    );
  }
  return (
    <section
      className="container-cards"
      style={ {
        zIndex: '1',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: '5px',
      } }
    >
      <div
        className="group"
        style={ {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          marginTop: '50%',
          justifyContent: 'space-between',

        } }
      >
        <button
          type="button"
          className="btn btn-outline-dark btn-sm"
          data-testid="All-category-filter"
          key={ -0 }
          onClick={ async () => categoryCheck() }
          style={ {
            marginBottom: '3px',
            borderColor: '#268144',
            color: '#268144',
          } }
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            onClick={ async () => categoryCheck(category.strCategory) }
            style={ {
              marginBottom: '3px',
              borderColor: '#268144',
              color: '#268144',
            } }
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      {drinks.map((drink, index) => (
        index < numberOfDrinks
          ? renderCards(drink, index)
          : null
      ))}
    </section>
  );
}
