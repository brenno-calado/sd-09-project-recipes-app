import React from 'react';

function ListFoodCards(props) {
  const renderCards = () => {
    const cards = props.items.map((item, index) => (
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <span data-testid={ `${index}-card-name` }>{item.strMeal}</span>
        <img
          data-testid={ `${index}-card-img` }
          src={ item.strMealThumb }
          alt={ item.strMeal }
        />
      </div>
    ));
    return cards;
  };

  return props.items && renderCards();
}

export default ListFoodCards;
