import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
            width: '7rem',
            alignItems: 'center',
            marginBottom: '5px',
            marginTop: '10px',
          } }
        >
          <img
            src={ drink.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt={ `${drink.strDrink} recipe` }
            className="card-img-top"
            style={ { width: '6rem', margin: '4px' } }
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
      className="row"
      style={ {
        justifyContent: 'space-around',
        margin: '5px',
      } }
    >
      <div
        className="btn-group"
        style={ {
          width: '100%',
        } }
      >
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="All-category-filter"
          key={ -0 }
          onClick={ async () => categoryCheck() }
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
            type="button"
            className="btn btn-secondary"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            onClick={ async () => categoryCheck(category.strCategory) }
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
