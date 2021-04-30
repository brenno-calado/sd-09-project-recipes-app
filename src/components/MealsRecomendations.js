import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { fecthByName } from '../services/api';
import 'react-multi-carousel/lib/styles.css';

function MealsRecomendations() {
  const [meals, setMeals] = useState([]);

  const getMeals = async () => {
    const result = await fecthByName('', true);
    const recomendations = 6;
    setMeals(result.meals.slice(0, recomendations));
  };

  useEffect(() => { getMeals(); }, []);

  const responsive = {
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  if (!meals.length) return <div>Loading...</div>;

  return (
    <Carousel responsive={ responsive }>
      { meals.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <span data-testid={ `${index}-recomendation-card` } key={ idMeal }>
          <img variant="top" src={ strMealThumb } alt={ strMeal } />
          <p data-testid={ `${index}-recomendation-title` }>{strMeal}</p>
        </span>
      )) }
    </Carousel>
  );
}

export default MealsRecomendations;
