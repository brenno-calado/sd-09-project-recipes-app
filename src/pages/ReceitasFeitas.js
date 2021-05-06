import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

function filterRecipesBy(recipeType) {
  return ({ type }) => recipeType === '' || recipeType === type;
}

function getRedirectUrl({ id, type }) {
  return type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}`;
}

function ReceitasFeitas() {
  const [doneRecipes] = useState(getDoneRecipes());
  const [filterBy, setFilterBy] = useState('');
  return (
    <div>
      <Header title="Receitas Feitas" showExplorerButton={ false } />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterBy('') }
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        onClick={ () => setFilterBy('comida') }
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterBy('bebida') }
        type="button"
      >
        Drinks
      </button>
      {doneRecipes.filter(filterRecipesBy(filterBy)).map((recipe, index) => (
        <section key={ index }>
          <Link to={ getRedirectUrl(recipe) }>
            <img
              width="100"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="Imagem da receita"
            />
          </Link>
          <span data-testid={ `${index}-horizontal-top-text` }>
            { getHorizontalTopText(recipe) }
          </span>
          <Link to={ getRedirectUrl(recipe) }>
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          </Link>
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
