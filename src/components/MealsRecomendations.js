import React, { useEffect, useState } from 'react';
import { fecthForName } from '../services/api';

function MealsRecomendations() {
  const [meals, setMeals] = useState([]);

  const getMeals = async () => {
    const result = await fecthForName('', true);
    const recomendations = 6;
    setMeals(result.meals.slice(0, recomendations));
  };

  useEffect(() => { getMeals(); }, []);

  return (
    <section>
      { meals.length && meals.map((el, index) => (
        <span
          key={ el.idMeal }
          data-testid={ `${index}-recomendation-card` }
        >
          <img src={ el.strMealThumb } alt={ `${el.strMeal} thumb` } />
          <p data-testid={ `${index}-recomendation-title` }>{el.strMeal}</p>
        </span>
      ))}
    </section>
  );
}

export default MealsRecomendations;
