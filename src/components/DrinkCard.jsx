import React from 'react';
import { objectOf, string, number } from 'prop-types';

function DrinkCard({ drink, index }) {
  function renderDrinkImage() {
    return (
      <img
        data-testid={ `${index}-card-img` }
        src={ drink.strDrinkThumb }
        alt={ drink.strDrink }
      />
    );
  }

  function renderDrinkName() {
    return (
      <h3 data-testid={ `${index}-card-name` }>{drink.strDrink}</h3>
    );
  }

  return (
    <div data-testid={ `${index}-recipe-card` }>
      {renderDrinkImage()}
      {renderDrinkName()}
    </div>
  );
}

DrinkCard.propTypes = {
  drink: objectOf(string),
  index: number,
}.isRequired;

export default DrinkCard;
