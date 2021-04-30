import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';
import CardRecipeMealRecommended
  from '../CardRecipeMealRecommended/CardRecipeMealRecommended';
import CardRecipeDrinkRecommended
  from '../CardRecipeDrinkRecommended/CardRecipeDrinkRecommended';
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
            && <CardRecipeDrinkRecommended
              recipe={ recipe }
              index={ index }
              key={ index }
            />)}
        {(recommendedRecipies && pageType === 'bebidas') && recommendedRecipies
          .map((recipe, index) => (index < '6')
            && <CardRecipeMealRecommended
              recipe={ recipe }
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
