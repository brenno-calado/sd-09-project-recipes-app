import React, { useContext } from 'react';
import PropTypes, { string } from 'prop-types';
import fetchApi from '../../services';
import { context } from '../../context';

function CategoriesButtons(props) {
  const { setFoods } = useContext(context);
  const lengthOfList = 12;

  const handleClick = ({ target }) => {
    fetchApi('food', 'categorie', target.name).then((res) => {
      const fetchFoods = res.meals
        .filter((food) => res.meals.indexOf(food) < lengthOfList);
      setFoods(fetchFoods);
    });
  };

  const { categories } = props;
  console.log(categories);
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
  categories: PropTypes.arrayOf(string).isRequired,
};

export default CategoriesButtons;
