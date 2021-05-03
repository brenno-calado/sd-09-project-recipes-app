import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { getFoodAll } from '../services/FoodAPI';
import { getDrinksAll } from '../services/DrinksAPI';

const RecomendationCard = (props) => {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendedType, setRecommendedType] = useState('');
  const { recipeType } = props;

  useEffect(() => {
    const getRecommendations = async () => {
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
    getRecommendations();
  }, [recipeType]);

  if (recommendations.length === 0) {
    return <div className="spinner-border text-primary" role="status" />;
  }

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
