import React from 'react';
import Header from '../components/Header';

function ReceitasFeitas() {
  const index = '';
  const tagName = '';
  return (
    <div>
      <Header title="Receitas Feitas" searchIcon={ false } />
      <section>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </section>
      <section>
        <div>
          <div>
            <img src="" alt="" data-testid={ `${index}-horizontal-image` } />
          </div>
          <h4 data-testid={ `${index}-horizontal-top-text` }>Categoria</h4>
          <h1 data-testid={ `${index}-horizontal-name` }>
            Nome da receita
          </h1>
          <p data-testid={ `${index}-horizontal-done-date` }>
            Data da receita feita
          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            Compartilhar
          </button>
          <p data-testid={ `${index}-${tagName}-horizontal-tag` }>Tag</p>
        </div>
      </section>
    </div>
  );
}

export default ReceitasFeitas;
