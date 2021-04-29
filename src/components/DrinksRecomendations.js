import React, { useEffect, useState } from 'react';
import { fecthForName } from '../services/api';

function DrinksRecomendations() {
  const [drinks, setDrinks] = useState([]);

  const getDrinks = async () => {
    const result = await fecthForName('', false);
    const recomendations = 6;
    setDrinks(result.drinks.slice(0, recomendations));
  };

  useEffect(() => { getDrinks(); }, []);

  return (
    <section>
      { drinks.length && drinks.map((el, index) => (
        <span
          key={ el.idDrink }
          data-testid={ `${index}-recomendation-card` }
        >
          <img src={ el.strDrinkThumb } alt={ `${el.strDrink} thumb` } />
          <p>{el.strDrink}</p>
        </span>
      ))}
    </section>
  );
}

export default DrinksRecomendations;
