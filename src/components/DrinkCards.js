import React from 'react';

import { Link } from 'react-router-dom';

export default function DrinkCards(categories, drinks, categoryCheck) {
  return (
    <section
      className="container-cards"
      style={ {
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
            } }
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      {drinks.map((drink, index) => (
        <Link key={ drink.idDrink } to={ `/bebidas/${drink.idDrink}` }>
          <div
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
            className="cards"
            style={ {
              width: '16rem',
              alignItems: 'center',
              marginBottom: '5px',
              marginTop: '10px',
            } }
          >
            <img
              src={ drink.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ `${drink.strDrink} recipe` }
              className="img"
              style={ {
                width: '15.5rem',
                margin: '4px',

              } }
            />
            <h5
              data-testid={ `${index}-card-name` }
              style={ {
                display: 'flex',
                justifyContent: 'center',
                textDecoration: 'none',
              } }
            >
              {drink.strDrink}
            </h5>
          </div>
        </Link>
      ))}
    </section>
  );
}
