import React from 'react';

const DoneRecipes = () => {
  const index = 0;
  const image = 0;
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ onClick }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <img
        src={ image }
        data-testid={ `${index}-horizontal-image` }
        alt="teste"
      />
      <span data-testid={ `${index}-horizontal-top-text` }>Categoria</span>
      <span data-testid={ `${index}-horizontal-name` }>Nome da Receita</span>
      <span data-testid={ `${index}-horizontal-done-date` }>Data</span>
      <img
        src="src/images/shareIcon.svg"
        alt="compartilhar"
        data-testid={ `${index}-horizontal-share-btn` }
        type="button"
      />
    </div>
  );
};

export default DoneRecipes;
