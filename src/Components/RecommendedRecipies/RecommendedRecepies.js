import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import CardRecipeMeal from '../CardRecipeMeal.js/CardRecipeMeal';
import CardRecipeDrink from '../CardRecipeDrink.js/CardRecipeDrink';
import './RecommendedRecipies.css';

function RecommendedRecipies({ pageType }) {
  const [recommendedRecipies, setRecommendedRecepies] = useState([]);

  useEffect(() => {
    if (pageType === 'comidas') {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((result) => setRecommendedRecepies(result.drinks));
    }
    if (pageType === 'bebidas') {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((result) => setRecommendedRecepies(result.meals));
    }
  });
  return (
    <div className="recommended-container">
      <h3>Recommended</h3>
      <div className="c-slider">
        {(recommendedRecipies && pageType === 'comidas') && recommendedRecipies
          .map((recipe, index) => (index < '6')
            && <CardRecipeDrink
              recipe={ recipe }
              testid={ `${index}-recomendation-card` }
              index={ index }
              key={ index }
            />)}
        {(recommendedRecipies && pageType === 'bebidas') && recommendedRecipies
          .map((recipe, index) => (index < '6')
            && <CardRecipeMeal
              recipe={ recipe }
              testid={ `${index}-recomendation-card` }
              index={ index }
              key={ index }
            />)}
      </div>
    </div>
  );
}

RecommendedRecipies.propTypes = {
  pageType: string.isRequired,
};

export default RecommendedRecipies;
