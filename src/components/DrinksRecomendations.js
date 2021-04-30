import React, { useEffect, useState } from 'react';
import { fecthByName } from '../services/api';

function DrinksRecomendations() {
  const [drinks, setDrinks] = useState([]);

  const getDrinks = async () => {
    const result = await fecthByName('', false);
    const recomendations = 6;
    setDrinks(result.drinks.slice(0, recomendations));
  };

  useEffect(() => { getDrinks(); }, []);

  if (!drinks.length) return <div>Loading...</div>;

  return (
    <section>
      { drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        <span data-testid={ `${index}-recomendation-card` } key={ idDrink }>
          <img src={ strDrinkThumb } alt={ strDrink } />
          <p>{strDrink}</p>
        </span>))}
    </section>
  );
}

export default DrinksRecomendations;
