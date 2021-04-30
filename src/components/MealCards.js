import React from 'react';

import { Link } from 'react-router-dom';

export default function MealCards(
  categories,
  meals,
  categoryCheck,
) {
  return (
    <section
      className="container-cards"
      style={ {
        justifyContent: 'space-around',
        margin: '5px',
      } }
    >
      <div

        className="btn-group btn-wrap"
      >
        <button
          type="button"
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
      <div className="card-container">

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
      {meals.map((meal, index) => (
        <Link key={ meal.idMeal } to={ `/comidas/${meal.idMeal}` }>
          <div
            key={ meal.idMeal }
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
              src={ meal.strMealThumb }
              data-testid={ `${index}-card-img` }
              alt={ `${meal.strMeal} recipe` }
              className="card-img-top"
              style={ { width: '15.5rem', margin: '4px' } }
            />
            <h5
              data-testid={ `${index}-card-name` }
              style={ {
                display: 'flex',
                justifyContent: 'center',
                textDecoration: 'none',
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
      </div>
    </section>
  );
}
