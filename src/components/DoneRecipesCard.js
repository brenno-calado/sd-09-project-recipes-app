import React from 'react';

function DoneRecipesCard(props) {
  const { index, tagName } = props;
  return (
    <div data-testid={ `${index}-${tagName}-horizontal-tag` }>
      <img src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" alt="Imagem comida" data-testid={ `${index}-horizontal-image` } />
      <div data-testid={ `${index}-horizontal-top-text` }>Italian - Vegetarian</div>
      <h3 data-testid={ `${index}-horizontal-name` }>Nome da receita</h3>
      <div data-testid={ `${index}-horizontal-done-date` }>Data receita foi feita</div>
      <div data-testid={ `${index}-horizontal-share-btn` }>Compartilhar</div>
    </div>
  );
}

export default DoneRecipesCard;
