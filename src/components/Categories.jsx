import React, { useContext } from 'react';
import '../styles/Card.css';
import { RecipesContext } from '../context';

function Categories() {
  const CINCO = 5;
  const { values: { categories } } = useContext(RecipesContext);
  return categories ? (
    <>
      { categories
        .filter((_, index) => index < CINCO)
        .map(({ strCategory }, index) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            key={ `strCategory${index}` }
            type="button"
          >
            { strCategory }
          </button>
        ))}
    </>
  ) : <span>Carregando ...</span>;
}

export default Categories;
