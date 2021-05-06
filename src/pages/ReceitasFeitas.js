import React, { useState } from 'react';
import Header from '../components/Header';
import ShareButton from '../components/ShareRecipeButton';

function getDoneRecipes() {
  const recipesString = localStorage.getItem('doneRecipes');
  const recipes = JSON.parse(recipesString);
  return recipes || [];
}

function getHorizontalTopText({ type, area, category, alcoholicOrNot }) {
  return type === 'comida' ? `${area} - ${category}` : `${alcoholicOrNot}`;
}

function ReceitasFeitas() {
  const [doneRecipes] = useState(getDoneRecipes());

  return (
    <div>
      <Header title="Receitas Feitas" showExplorerButton={ false } />
      <button data-testid="filter-by-all-btn" type="button">All</button>
      <button data-testid="filter-by-food-btn" type="button">Food</button>
      <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      {doneRecipes.map((recipe, index) => (
        <section key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt="Imagem da receita"
          />
          <span data-testid={ `${index}-horizontal-top-text` }>
            { getHorizontalTopText(recipe) }
          </span>
          <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          <span data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</span>
          <ShareButton
            isMeal={ recipe.type === 'comida' }
            recipeId={ recipe.id }
            dataTestid={ `${index}-horizontal-share-btn` }
          />
          {recipe.tags.map((tag) => (
            <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </span>
          ))}
        </section>
      ))}
    </div>
  );
}

export default ReceitasFeitas;
