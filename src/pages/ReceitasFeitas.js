import React /* { useState } */ from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFeitas() {
  const localData = JSON.parse(localStorage.getItem('doneRecipes'));

  // const [button, setButton] = useState();

  return (
    <div>
      <Header title="Receitas Feitas" searchIcon={ false } />
      <section>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </section>
      {
        localData.map((recipe, index) => (
          <div key="1">
            <p>{recipe.alcoholicOrNot}</p>
            <div>
              <img
                src={ recipe.image }
                alt=""
                data-testid={ `${index}-horizontal-image` }
              />
            </div>
            <h4 data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</h4>
            <h1 data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </h1>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { recipe.doneDate }
            </p>
            <button
              type="button"
              onClick={ () => navigator.clipboard.writeText(recipe.link) }
              data-testid={ `${index}-horizontal-share-btn` }
            >
              <img src={ shareIcon } alt="compartilhar" />
            </button>
            <p
              data-testid={ `${index}-${recipe.tags}-horizontal-tag` }
            >
              { recipe.tags }
            </p>
            <p
              data-testid={ `${index}-${recipe.type}-horizontal-tag` }
            >
              { recipe.type }
            </p>
          </div>
        ))
      }
    </div>

  );
}

export default ReceitasFeitas;
