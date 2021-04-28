import React from 'react';
import { objectOf } from 'prop-types';

class RecipeDrinkCard extends React.Component {
  render() {
    const { drink, index } = this.props;
    return (
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
      </div>
    );
  }
}

RecipeDrinkCard.propTypes = {
  drink: objectOf,
}.isRequired;

export default RecipeDrinkCard;
