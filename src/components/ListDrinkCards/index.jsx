import React from 'react';

function ListCards(props) {
  const renderCards = () => {
    const cards = props.items.map((item, index) => (
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <span data-testid={ `${index}-card-name` }>{item.strDrink}</span>
        <img
          data-testid={ `${index}-card-img` }
          src={ item.strDrinkThumb }
          alt={ item.strDrink }
        />
      </div>
    ));
    return cards;
  };

  return props.items && renderCards();
}

export default ListCards;
