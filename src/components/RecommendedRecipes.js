import React, { useState, useEffect } from 'react';
import 'pure-react-carousel/dist/react-carousel.es.css';
import PropTypes from 'prop-types';
import { fetchMealsApi, fetchDrinksApi } from '../services/index';

function RecommendedRecipes({ reference }) {
  const [recommendedRecipes, setRecommendations] = useState([]);
  const numberOfElements = 6;
  useEffect(() => {
    const fetchRecommendations = async () => {
      let recommendations = [];
      if (reference === 'meals') recommendations = await fetchMealsApi();
      if (reference === 'drinks') recommendations = await fetchDrinksApi();
      return setRecommendations(recommendations.slice(0, numberOfElements));
    };
    fetchRecommendations();
  }, [reference]);

  return (
    recommendedRecipes.length !== 0 ? (
      <div className="recommendations-container">
        {
          recommendedRecipes.map((item, index) => (
            <div
              key={ index }
              className="recommended"
              data-testid={ `${index}-recomendation-card` }
            >
              <h3
                data-testid={ `${index}-recomendation-title` }
              >
                { item.strMeal || item.strDrink }
              </h3>
              <h4>{item.strCategory || item.strAlcoholic}</h4>
              <img src={ item.strMealThumb || item.strDrinkThumb } alt="Recipe" />
            </div>
          ))
        }
      </div>
    )
      : <span>Loading...</span>
  );
}

RecommendedRecipes.propTypes = {
  reference: PropTypes.string.isRequired,
};

export default RecommendedRecipes;
