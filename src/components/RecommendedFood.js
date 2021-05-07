import React, { useEffect, useState } from 'react';
import '../App.css';

const RecomendedFood = () => {
  const [meals, setMeals] = useState([]);
  const limit = 6;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const result = await response.json();
        setMeals(result.meals.slice(0, limit));
      } catch (error) {
        return Error(error);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="recommendation-container">
      {
        meals.map((meal, index) => (
          <div
            className="recommended-box"
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <img
              className="recommended-box-image"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <div>
              <span className="recommended-box-category">{meal.strCategory}</span>
              <span>{meal.strMeal}</span>
              <p
                className="recommended-box-name"
                data-testid={ `${index}-recomendation-title` }
              >
                {meal.strMeal}
              </p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default RecomendedFood;
