import React from 'react';

function categoryDrinkButton(drink, handleClickButtonName) {
  const five = 5;
  return (
    drink.map(({ strCategory }, index) => (
      index < five && (
        <div className="category-btn">
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

export default categoryDrinkButton;
