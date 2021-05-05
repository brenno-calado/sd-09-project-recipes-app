import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import '../App.css';

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
            <div
              className="recommended-box"
              data-testid={ `${index}-recomendation-card` }
              key={ index }
            >
              <img
                className="recommended-box-image"
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />
              <div>
                <span className="recommended-box-category">{item.strCategory}</span>
                <span>{item.strMeal}</span>
                <p
                  className="recommended-box-name"
                  data-testid={ `${index}-recomendation-title` }
                >
                  {item.strMeal}

                </p>
              </div>
            </div>
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
