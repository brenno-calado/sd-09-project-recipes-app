import React from 'react';

const RecipeCard = (drink) => {
  console.log(drink);
  return <p>{drink.drink.strDrink}</p>;
};

export default RecipeCard;
