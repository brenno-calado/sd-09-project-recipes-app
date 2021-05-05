import React from 'react';
import { objectOf } from 'prop-types';

class RecommendationCard extends React.Component {
  render() {
    const { recommendationRecipe, index } = this.props;
    console.log(recommendationRecipe);
    const query = window.location.pathname.includes('comidas') ? 'Drink' : 'Meal';
    return (
      <div
        data-testid={ `${index}-recomendation-card` }
      >
        <img
          src={ recommendationRecipe[`str${query}Thumb`] }
          alt={ recommendationRecipe[`str${query}`] }
        />
        <p>{recommendationRecipe[`str${query}`]}</p>
      </div>
    );
  }
}

RecommendationCard.propTypes = {
  recommendationRecipe: objectOf,
}.isRequired;

export default RecommendationCard;
