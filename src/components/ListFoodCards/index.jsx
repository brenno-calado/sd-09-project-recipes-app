import React from 'react';
import { Link } from 'react-router-dom';

const MAX_ITENS = 12;

function ListFoodCards(props) {
  const renderCards = () => {
    const cards = props.items.filter((item) => props.items.indexOf(item) < MAX_ITENS)
      .map((item, index) => ((
        <div key={ item.idMeal } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/comidas/${item.idMeal}` }>
            <span data-testid={ `${index}-card-name` }>{item.strMeal}</span>
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
          </Link>
        </div>
      )));
    return cards;
  };

  return props.items && renderCards();
}

export default ListFoodCards;
