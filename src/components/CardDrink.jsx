import React, { useContext } from 'react';
import DrinksContext from '../context/DrinksContext';

function CardDrink() {
  const {
    values: {
      drinks,
    },
  } = useContext(DrinksContext);

  const maxCards = 12;

  if (drinks === undefined) return '';

  return (
    <section>
      {drinks.map(({ strDrink, strDrinkThumb }, index) => {
        if (index >= maxCards) return '';
        return (
          <div key={ strDrink } data-testid={ `${index}-recipe-card` }>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{strDrink}</p>
          </div>
        );
      })}
    </section>
  );
}

export default CardDrink;
