import React from 'react';
import { useLocation } from 'react-router-dom';

function Cards({ data }) {
  const cardLimit = 12;
  const { pathname } = useLocation();
  if (pathname === '/comidas') {
    return (
      data.map((recipe, index) => {
        if (index < cardLimit) {
          return (
            <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                src={ recipe.strMealThumb }
                alt="recipe"
                data-testid={ `${index}-card-img` }
              />
              <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h3>
            </div>
          );
        }
        return 'food';
      })
    );
  }
  return (
    data.map((recipe, index) => {
      if (index < cardLimit) {
        return (
          <div key={ recipe.idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strDrinkThumb }
              alt="recipe"
              data-testid={ `${index}-card-img` }
            />
            <h3 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h3>
          </div>
        );
      }
      return 'drink';
    })
  );
}

export default Cards;
