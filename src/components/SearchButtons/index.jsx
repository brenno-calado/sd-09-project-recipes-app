import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../../services';
import { context } from '../../context';
import ButtonsContainer from './styled';

function CategoriesButtons(props) {
  const { type } = props;
  const {
    setFoods,
    setDrinks,
    categories,
    toggleButton,
    setToggleButton,
  } = useContext(context);
  const lengthOfList = 12;

  const fecthAll = (recipe, name, categorie) => {
    if (type === 'food') {
      fetchApi('food', name, categorie).then((res) => {
        const fetchFoods = res.meals
          .filter((food) => res.meals.indexOf(food) < lengthOfList);
        setFoods(fetchFoods);
      });
    }

    if (type === 'drink') {
      fetchApi('cocktail', name, categorie).then((res) => {
        const fetchDrinks = res.drinks
          .filter((drink) => res.drinks.indexOf(drink) < lengthOfList);
        setDrinks(fetchDrinks);
      });
    }
  };

  const handleClick = ({ target }) => {
    if (toggleButton === null || toggleButton !== target.name) {
      setToggleButton(target.name);
    }

    if (toggleButton === target.name) {
      setToggleButton(null);
      if (type === 'food') {
        fecthAll('food', 'name', '');
      }
      if (type === 'drink') {
        fecthAll('cocktail', 'name', '');
      }
    }

    if (type === 'food') {
      fecthAll('food', 'categorie', target.name);
    }

    if (type === 'drink') {
      fecthAll('cocktail', 'categorie', target.name);
    }
  };

  return (
    <ButtonsContainer>
      <button
        type="button"
        name="all"
        data-testid="All-category-filter"
        onClick={ () => fecthAll(type, 'name', '') }
      >
        All
      </button>
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
    </ButtonsContainer>
  );
}

CategoriesButtons.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CategoriesButtons;
