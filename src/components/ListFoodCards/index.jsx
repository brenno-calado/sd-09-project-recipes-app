import React from 'react';

const MAX_ITENS = 12;

function ListFoodCards(props) {
  const renderCards = () => {
    const cards = props.items.filter((item) => props.items.indexOf(item) < MAX_ITENS)
      .map((item, index) => ((
        <div key={ item.idMeal } data-testid={ `${index}-recipe-card` }>
          <span data-testid={ `${index}-card-name` }>{item.strMeal}</span>
          <img
            data-testid={ `${index}-card-img` }
            src={ item.strMealThumb }
            alt={ item.strMeal }
          />
        </div>
      )));
    return cards;
  };
  // const renderCards = () => {
  //   const cards = props.items.filter((item) => (
  //     <div key={ index } data-testid={ `${index}-recipe-card` }>
  //       <span data-testid={ `${index}-card-name` }>{item.strMeal}</span>
  //       <img
  //         data-testid={ `${index}-card-img` }
  //         src={ item.strMealThumb }
  //         alt={ item.strMeal }
  //       />
  //     </div>
  //   ));
  //   return cards;
  // };

  return props.items && renderCards();
}

export default ListFoodCards;
