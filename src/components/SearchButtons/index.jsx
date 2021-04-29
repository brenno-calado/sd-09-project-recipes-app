import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../../services';
import { context } from '../../context';

function CategoriesButtons(props) {
  const { type } = props;
  const {
    setFoods, setDrinks, categories,
  } = useContext(context);
  const lengthOfList = 12;

  const handleClick = ({ target }) => {
    if (type === 'food') {
      fetchApi('food', 'categorie', target.name).then((res) => {
        const fetchFoods = res.meals
          .filter((food) => res.meals.indexOf(food) < lengthOfList);
        setFoods(fetchFoods);
      });
    }

    if (type === 'drink') {
      fetchApi('cocktail', 'categorie', target.name).then((res) => {
        const fetchDrinks = res.drinks
          .filter((drink) => res.drinks.indexOf(drink) < lengthOfList);
        setDrinks(fetchDrinks);
      });
    }
  };

  return (
    <>
      {
        categories.map(({ strCategory }) => (
          <button
            key={ strCategory }
            type="button"
            name={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ handleClick }
          >
            { strCategory }
          </button>
        ))
      }
    </>
  );
}

CategoriesButtons.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CategoriesButtons;
