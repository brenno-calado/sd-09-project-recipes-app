import React, { useContext } from 'react';
import fetchApi from '../../services';
import { context } from '../../context';

function CategoriesButtons() {
  const { setFoods, categories } = useContext(context);
  const lengthOfList = 12;

  const handleClick = ({ target }) => {
    fetchApi('food', 'categorie', target.name).then((res) => {
      const fetchFoods = res.meals
        .filter((food) => res.meals.indexOf(food) < lengthOfList);
      setFoods(fetchFoods);
    });
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

export default CategoriesButtons;
