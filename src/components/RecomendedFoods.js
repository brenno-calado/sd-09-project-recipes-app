import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecomendedFoods = () => {
  const [cocktails, setCocktails] = useState([]);
  const [start, setStart] = useState(0);
  const [array, setArray] = useState([]);
  const limit = 6;
  console.log(array);
  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const result = await response.json();
        setCocktails(result.meals.slice(0, limit));
        setArray([result.meals[start], result.meals[start + 1]]);
      } catch (error) {
        return Error(error);
      }
    };
    fetchCocktails();
  }, []);

  const increment = () => {
    setStart(start + 1);
    setArray([cocktails[start], cocktails[start + 1]]);
  };

  const decrement = () => {
    setStart(start - 1);
    setArray([cocktails[start], cocktails[start + 1]]);
  };
  return (
    <div>
      <h2>Recomendadas</h2>
      <div>
        {
          cocktails.map((item, index) => (
            <Link
              to={ `/comidas/${item.idMeal}` }
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <h2 data-testid={ `${index}-recomendation-title` }>{ item.strMeal }</h2>
              <img
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />
              <div>
                <span>{item.strCategory}</span>
                <span>{item.strMeal}</span>
              </div>
            </Link>
          ))
        }
      </div>
      <div>
        <button
          type="button"
          disabled={ start === 0 }
          onClick={ decrement }
        >
          voltar
        </button>
        <button
          type="button"
          onClick={ increment }
          disabled={ start + 1 === limit }
        >
          próximo
        </button>
      </div>
    </div>

  );
};

export default RecomendedFoods;
