import React from 'react';
import { Link } from 'react-router-dom';

const MAX_ITENS = 12;

function ListCards(props) {
  const renderCards = () => {
    const cards = props.items.filter((item) => props.items.indexOf(item) < MAX_ITENS)
      .map((item, index) => ((
        <div key={ item.idDrink } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/bebidas/${item.idDrink}` }>
            <span data-testid={ `${index}-card-name` }>{item.strDrink}</span>
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
          </Link>
        </div>
      )));
    return cards;
  };

  return props.items && renderCards();
}

export default ListCards;
