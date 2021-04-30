import React, { useState } from 'react';
import '../styles/Card.css';
import { useLocation } from 'react-router-dom';
import getCategories from '../services/categoriesAPI';

function Categories() {
  const { pathname } = useLocation();
  const category = pathname.includes('comidas') ? 'Meal' : 'Drink';
  const [categories, setCategories] = useState();
  getCategories(category)
    .then((response) => setCategories(response));
  const CINCO = 5;
  return categories ? (
    <>
      { categories
        .filter((_, index) => index < CINCO)
        .map((element, index) => (
          <button
            type="button"
            key={ index }
          >
            {element}
          </button>
        ))}
    </>
  ) : <span>Carregando ...</span>;
}

export default Categories;
