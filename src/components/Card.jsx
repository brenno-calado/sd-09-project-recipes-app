import React, { useContext } from 'react';
import '../styles/Card.css';
import { useLocation } from 'react-router-dom';
import { RecipesContext } from '../context';

function Card() {
  const { values: { recipesResult } } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const category = pathname.includes('comidas') ? 'Meal' : 'Drink';
  const DOZE = 12;
  return (
    <>
      { recipesResult
        .filter((_, index) => index < DOZE)
        .map((element, index) => (
          <section
            className="recipe-card"
            data-testid={ `${index}-recipe-card` }
            key={ element[`id${category}`] }
          >
            <img
              alt={ `imagem de ${element.strMeal}` }
              data-testid={ `${index}-card-img` }
              src={ element[`str${category}Thumb`] }
            />
            <p data-testid={ `${index}-card-name` }>
              { element[`str${category}`] }
            </p>
          </section>
        ))}
    </>
  );
}

export default Card;
