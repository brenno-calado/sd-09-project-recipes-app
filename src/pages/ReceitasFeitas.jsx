import React, { useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

// import doneRecipes from '../services/zz'; Onde pego as receitas feitas.

import '../styles/recipes.css';

function ReceitasFeitas() {
  const [list, setList] = useState(doneRecipes);

  const doList = (filter) => {
    setList(
      doneRecipes.filter(
        (element) => element.type === filter,
      ),
    );
  };

  const doFilter = (filter) => {
    if (filter === 'all') {
      setList(doneRecipes);
    }
    if (filter === 'food') {
      doList('comida');
    }
    if (filter === 'drink') {
      doList('bebida');
    }
  };

  console.log(list);
  return (
    <>
      <Header textProp="Receitas Feitas" />
      <div className="btn-group-done">
        <button
          className="small-button"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => doFilter('all') }
        >
          All
        </button>

        <button
          className="small-button"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => doFilter('food') }
        >
          Food
        </button>

        <button
          className="small-button"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => doFilter('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
        {
          list.map(
            (recipe, index) => {
              if (recipe === undefined) {
                return null;
              }
              return (
                <Card
                  key={ recipe.id }
                  recipe={ recipe }
                  indice={ index }
                />
              );
            },
          )
        }
      </div>
    </>
  );
}

export default ReceitasFeitas;
