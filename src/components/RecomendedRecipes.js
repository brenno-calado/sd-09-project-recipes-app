import React, { useState, useEffect } from 'react';
import Carousel, { consts } from 'react-elastic-carousel';
import { fetchMealsApi, fetchDrinksApi } from '../services/index';

function RecommendedRecipes(reference) {
  const [recommendedRecipes, setRecommendations] = useState([]);
  const numberOfElements = 6;
  useEffect(() => {
    const fetchRecommendations = async () => {
      const recommendations = reference === 'meals' ? await fetchDrinksApi() : await fetchMealsApi();
      setRecommendations(recommendations.slice(0, numberOfElements));
    };
    fetchRecommendations();
  }, []);

  return (
    recommendedRecipes.length !== 0
      ? <Carousel itemsToShow={ 2 } itemsToScroll={ 2 } itemPosition={ consts.CENTER }>
        {recommendedRecipes
          .map((item, index) => (
            <div
              key={ index }
              className="recommended"
              data-testid={ `${index}-recomendation-card` }
            >
              <h3>{ item.strMeal || item.strDrink }</h3>
              <h4>{item.strCategory || item.strAlcoholic}</h4>
              <img src={ item.strMealThumb } alt="Recipe" />
            </div>
          ))}
      </Carousel>
      : <span>Loading...</span>
  );
}

export default RecommendedRecipes;
