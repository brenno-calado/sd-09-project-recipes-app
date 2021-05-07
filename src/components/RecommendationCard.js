import React from 'react';
import { objectOf } from 'prop-types';

class RecommendationCard extends React.Component {
  render() {
    const { recommendationRecipe, index } = this.props;
    const query = window.location.pathname.includes('comidas') ? 'Drink' : 'Meal';
    return (
      <div>
        <img
          src={ recommendationRecipe[`str${query}Thumb`] }
          alt={ recommendationRecipe[`str${query}`] }
        />
        <p data-testid={ `${index}-recomendation-title` }>
          {recommendationRecipe[`str${query}`]}
        </p>
      </div>
    );
  }
}

RecommendationCard.propTypes = {
  recommendationRecipe: objectOf,
}.isRequired;

export default RecommendationCard;
