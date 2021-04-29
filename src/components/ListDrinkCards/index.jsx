import React from 'react';

function ListCards(props) {
  const renderCards = () => {
    const cards = props.items.map((item, index) => (
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          alt={ item.strDrink }
          src={ item.strDrinkThumb }
        />
        <span data-testid={ `${index}-card-name` }>{item.strDrink}</span>
      </div>
    ));
    return cards;
  };

  return props.items && renderCards();
}

export default ListCards;
