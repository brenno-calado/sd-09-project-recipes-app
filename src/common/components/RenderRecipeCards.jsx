import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeCard from './RecipeCard';

function RenderRecipeCards({
  array,
  list,
  kindOfFood,
  cardsLimit,
}) {
  const history = useHistory();
  const handleCardClick = (recipe, kind) => {
    if (kind === 'meals') {
      history.push(`/comidas/${recipe.idMeal}`, recipe);
    } else { history.push(`/bebidas/${recipe.idDrink}`, recipe); }
  };

  function renderCard(theChosenOne) {
    return (
      theChosenOne.slice(0, cardsLimit).map((meal, index) => (
        <button
          key={ index }
          type="button"
          onClick={ () => handleCardClick(meal, kindOfFood) }
        >
          <RecipeCard
            key={ index }
            index={ index }
            recipe={ meal }
          />
        </button>
      )));
  }

  return (
    <div>
      {
        array ? renderCard(array[kindOfFood]) : renderCard(list[kindOfFood])
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
