import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function DrinkCards(categories, drinks) {
  return (
    <div
      style={ {
        alignItems: 'center',
        margin: '10px',
        marginTop: '10%',
        marginBottom: '15%',
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
          data-testid="all-category-filter"
          key={ -0 }
          onClick={ () => { } }
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
            type="button"
            className="btn btn-secondary"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ index }
            onClick={ () => { } }
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      <section
        className="row"
        style={ {
          justifyContent: 'space-around',
          margin: '5px',
        } }
      >
        {drinks.map((drink, index) => (
          <Link key={ drink.idDrink } to={ `/bebidas/${drink.idDrink}` }>
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
        ))}
      </section>
    </div>
  );
}
