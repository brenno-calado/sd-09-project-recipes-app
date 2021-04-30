import React from 'react';

const MAX_ITENS = 12;

function ListCards(props) {
  const renderCards = () => {
<<<<<<< HEAD
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
=======
    const cards = props.items.filter((item) => props.items.indexOf(item) < MAX_ITENS)
      .map((item, index) => ((
        <div key={ item.idDrink } data-testid={ `${index}-recipe-card` }>
          <span data-testid={ `${index}-card-name` }>{item.strDrink}</span>
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strDrinkThumb }
            alt={ item.strDrink }
          />
        </div>
      )));
>>>>>>> main-group-27-develop
    return cards;
  };

  return props.items && renderCards();
}

export default ListCards;
