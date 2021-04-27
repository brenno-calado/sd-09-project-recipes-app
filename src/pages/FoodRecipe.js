import React from 'react';

function FoodRecipe(props) {
  
  return (
    <h1>Detalhes da receita{props.match.params.id}</h1>
  );
}

export default FoodRecipe;
