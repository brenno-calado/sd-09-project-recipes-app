import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';

function categoryDrinkButton(drink, handleClickButtonName) {
  const five = 5;
  return (
    <DropdownButton
      id="dropdown-basic-button"
      variant="light"
      title="Escolha uma opção"
    >
      {drink.map(({ strCategory }, index) => (
        index < five && (
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
        )
      ))}
    </DropdownButton>
  );
}

export default categoryDrinkButton;
