import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RecomendedDrinks = () => {
  const [cocktails, setCocktails] = useState([]);
  const [start, setStart] = useState(0);
  const [array, setArray] = useState([]);
  const limit = 6;
  console.log(array);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const result = await response.json();
        setCocktails(result.drinks.slice(0, limit));
        setArray([result.drinks[start], result.drinks[start + 1]]);
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
      <div>
        {
          cocktails.map((item, index) => (
            <Link
              to={ `/bebidas/${item.idDrink}` }
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              <h2 data-testid={ `${index}-recomendation-title` }>{ item.strDrink }</h2>
              <img
                style={ { width: 30, height: 30 } }
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
              />
              <div>
                <span>{item.strAlcoholic}</span>
                <span>{item.strDrink}</span>
              </div>
            </Link>
          ))
        }
      </div>
      <div>
        <button
          type="button"
          onClick={ decrement }
          disabled={ start === 0 }
        >
          voltar
        </button>
        <button
          type="button"
          onClick={ increment }
          disabled={ start + 1 === limit }
        >
          proximo
        </button>
      </div>
    </div>

  );
};

export default RecomendedDrinks;
