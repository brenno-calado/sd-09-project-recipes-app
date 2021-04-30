import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

function RenderRecipeCards({
  array,
  list,
  kindOfFood,
  cardsLimit,
}) {
  function renderCard(theChosenOne) {
    return theChosenOne[kindOfFood].slice(0, cardsLimit).map((meal, index) => (
      <RecipeCard
        key={ index }
        index={ index }
        recipe={ meal }
      />
    ));
  }

  return (
    <div>
      {
        array ? renderCard(array) : renderCard(list)
      }
    </div>
  );
}

RenderRecipeCards.defaultProps = {
  array: undefined,
  list: undefined,
};

RenderRecipeCards.propTypes = ({
  array: PropTypes.arrayOf(PropTypes.any),
  list: PropTypes.arrayOf(PropTypes.any),
  kindOfFood: PropTypes.string.isRequired,
  cardsLimit: PropTypes.number.isRequired,
});

export default RenderRecipeCards;
