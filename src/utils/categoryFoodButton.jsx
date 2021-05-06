import React from 'react';

function categoryFoodButton(handleClickButtonName, meal) {
  const five = 5;
  return (
    meal.map(({ strCategory }, index) => (
      index < five && (
        <div className="categoty-btn">
          <button
            key={ strCategory }
            type="button"
            name={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ ({ target }) => handleClickButtonName({ target }) }
          >
            { strCategory }
          </button>
        </div>
      )
    ))
  );
}

export default categoryFoodButton;
