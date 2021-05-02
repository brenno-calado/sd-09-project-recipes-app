import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { getFoodAll } from '../services/FoodAPI';
import { getDrinksAll } from '../services/DrinksAPI';

const RecomendationCard = (props) => {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendedType, setRecommendedType] = useState('');

  const getRecommendations = async () => {
    const { recipeType } = props;
    const arraySize = 6;

    if (recipeType === 'Meal') {
      setRecommendedType('Drink');
      const drinks = await getDrinksAll();
      setRecommendations(drinks.drinks.slice(0, arraySize));
    } else if (recipeType === 'Drink') {
      setRecommendedType('Meal');
      const meals = await getFoodAll();
      setRecommendations(meals.meals.slice(0, arraySize));
    }
  };

  useEffect(() => {
    getRecommendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (recommendations.length === 0) return 'Loading...';

  return (
    <div>
      {
        recommendations.map((recipe, index) => (
          <div
            key={ recipe[`str${recommendedType}`] }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ recipe[`str${recommendedType}Thumb`] }
              alt="imagem da receita"
              width="300"
              height="300"
            />
            <p>{ recipe.strCategory }</p>
            <p
              data-testid={ `${index}-recomendation-title` }
            >
              { recipe[`str${recommendedType}`] }
            </p>
          </div>
        ))
      }
    </div>
  );
};

RecomendationCard.propTypes = {
  recipeType: string,
}.isRequired;

export default RecomendationCard;
