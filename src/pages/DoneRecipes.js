import React from 'react';
import { Header } from '../components';

function DoneRecipes() {
  const createButton = (testid, id, onClick) => (
    <button data-testid={ testid } id={ id } type="button" onClick={ onClick }>
      { id }
    </button>
  );
  return (
    <section>
      <Header title="Receitas Feitas" />
      { createButton('filter-by-all-btn', 'All') }
      { createButton('filter-by-food-btn', 'Food') }
      { createButton('filter-by-drink-btn', 'Drinks') }
    </section>
  );
}

export default DoneRecipes;
