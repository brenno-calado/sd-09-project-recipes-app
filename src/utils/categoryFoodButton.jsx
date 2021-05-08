import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function categoryFoodButton(handleClickButtonName, meal) {
  const five = 5;
  return (
    <DropdownButton
      id="dropdown-basic-button"
      variant="light"
      title="Escolha uma opção"
    >
      { meal.map(({ strCategory }, index) => (
        index < five && (
          <div className="categoty-btn">
            <Dropdown.Item
              href="#/action-index"
              key={ strCategory }
              type="button"
              name={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ ({ target }) => handleClickButtonName({ target }) }
            >
              { strCategory }
            </Dropdown.Item>
          </div>
        )
      ))}
    </DropdownButton>
  );
}

export default categoryFoodButton;
