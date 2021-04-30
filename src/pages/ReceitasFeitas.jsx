import React from 'react';
import Header from '../components/Header';
import '../styles/recipes.css';

function ReceitasFeitas() {
  return (
    <>
      <Header textProp="Receitas Feitas" />
      <div className="btn-group-done">
        <button
          className="small-button"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {} }
        >
          All
        </button>

        <button
          className="small-button"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {} }
        >
          Food
        </button>

        <button
          className="small-button"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {} }
        >
          Drinks
        </button>

      </div>
    </>
  );
}

export default ReceitasFeitas;
