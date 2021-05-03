import { string } from 'prop-types';
import Carousel from 'react-multi-carousel';
import React, { useEffect, useState } from 'react';

import { getFoodAll } from '../services/FoodAPI';
import { getDrinksAll } from '../services/DrinksAPI';

import 'react-multi-carousel/lib/styles.css';

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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={ responsive }>
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
    </Carousel>
  );
};

RecomendationCard.propTypes = {
  recipeType: string,
}.isRequired;

export default RecomendationCard;
