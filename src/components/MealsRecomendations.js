import React, { useEffect, useState } from 'react';
import { fecthByName } from '../services/api';

function MealsRecomendations() {
  const [meals, setMeals] = useState([]);

  const getMeals = async () => {
    const result = await fecthByName('', true);
    const recomendations = 6;
    setMeals(result.meals.slice(0, recomendations));
  };

  useEffect(() => { getMeals(); }, []);

  if (!meals.length) return <div>Loading...</div>;

  return (
    <section>
      { meals.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <span data-testid={ `${index}-recomendation-card` } key={ idMeal }>
          <img src={ strMealThumb } alt={ strMeal } />
          <p data-testid={ `${index}-recomendation-title` }>{strMeal}</p>
        </span>)) }
    </section>
  );
}

export default MealsRecomendations;
