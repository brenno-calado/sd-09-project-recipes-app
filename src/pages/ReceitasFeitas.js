import React from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const doneRecipes = [{ tags: ['Pasta', 'Curry'] }, { tags: [] }];

function ReceitasFeitas() {
  return (
    <div>
      <Header title="Receitas Feitas" showExplorerButton={ false } />
      <button data-testid="filter-by-all-btn" type="button">All</button>
      <button data-testid="filter-by-food-btn" type="button">Food</button>
      <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      {doneRecipes.map((item, index) => (
        <section key={ index }>
          <img data-testid={ `${index}-horizontal-image` } src="" alt="" />
          <span data-testid={ `${index}-horizontal-top-text` } />
          <h3 data-testid={ `${index}-horizontal-name` }>Name</h3>
          <span data-testid={ `${index}-horizontal-done-date` } />
          <span data-testid={ `${index}-horizontal-share-btn` } />
          {item.tags.map((tag) => (
            <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` } />))}
        </section>
      ))}
    </div>
  );
}

export default ReceitasFeitas;
