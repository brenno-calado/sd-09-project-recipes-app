import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function MealCards(categories, meals, categoryCheck) {
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
      {meals.map((meal, index) => (
        <Link key={ meal.idMeal } to={ `/comidas/${meal.idMeal}` }>
          <div
            key={ meal.idMeal }
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
              src={ meal.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ `${meal.strMeal} recipe` }
              className="card-img-top"
              style={ { width: '6rem', margin: '4px' } }
            />
            <h5
              data-testid={ `${index}-card-name` }
              className="card-title"
            >
              {meal.strMeal}
            </h5>
          </div>
        </Link>
      ))}
    </section>
  );
}
