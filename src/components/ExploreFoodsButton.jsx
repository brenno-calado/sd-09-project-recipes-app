import React from 'react';
import PropTypes from 'prop-types';

export default function ExploreFoodsButton({ details, idMeal, testId, item }) {
  return (
    <button
      type="button"
      data-testid={ testId }
      onClick={ () => details(idMeal) }
    >
      {item}
    </button>
  );
}

ExploreFoodsButton.propTypes = {
  details: PropTypes.func.isRequired,
  idMeal: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};
