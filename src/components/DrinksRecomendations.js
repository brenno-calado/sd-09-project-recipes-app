import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { fecthByName } from '../services/api';
import 'react-multi-carousel/lib/styles.css';

function DrinksRecomendations() {
  const [drinks, setDrinks] = useState([]);

  const getDrinks = async () => {
    const result = await fecthByName('', false);
    const recomendations = 6;
    setDrinks(result.drinks.slice(0, recomendations));
  };

  useEffect(() => { getDrinks(); }, []);

  const responsive = {
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  if (!drinks.length) return <div>Loading...</div>;

  return (
    <Carousel responsive={ responsive }>
      { drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        <span data-testid={ `${index}-recomendation-card` } key={ idDrink }>
          <img src={ strDrinkThumb } alt={ strDrink } />
          <p data-testid={ `${index}-recomendation-title` }>{strDrink}</p>
        </span>
      ))}
    </Carousel>
  );
}

export default DrinksRecomendations;
