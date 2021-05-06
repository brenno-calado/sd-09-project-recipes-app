import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import HeaderFoods from '../components/HeaderFoods';
import RecipeDoneCard from '../components/RecipeDoneCard';

function RecipesMade() {
  const [recipesMadeButton, setRecipesMadeButton] = useState();
  const [renderRecipesMade, setRenderRecipesMade] = useState();

  useEffect(() => {
    setRecipesMadeButton(recipesMadeButton);
  }, [recipesMadeButton]);

  function renderAllRecipesMade() {
    const vari = JSON.parse(localStorage.getItem('doneRecipes'));
    const filter = vari.map(({ id, image, category, name, doneDate, tags, type, area, alcoholicOrNot }, index) => (
      <RecipeDoneCard
        key={ id }
        image={ image }
        category={ category }
        name={ name }
        doneDate={ doneDate }
        tagName={ tags }
        index={ index }
        shouldFavorite={ false }
        type={ type }
        id={ id }
        area={ area }
        alcoholicOrNot={ alcoholicOrNot }
      />
    ));
    return filter;
  }

  useEffect(() => {
    setRenderRecipesMade(renderAllRecipesMade());
  }, []);

  function renderFoodsRecipesMade() {
    const vari = JSON.parse(localStorage.getItem('doneRecipes'));
    const filter = vari
      .map(({ id, image, category, name, doneDate, tags, type, area }, index) => (
        type === 'comida' && (
          <RecipeDoneCard
            key={ id }
            image={ image }
            category={ category }
            name={ name }
            doneDate={ doneDate }
            tagName={ tags }
            index={ index }
            shouldFavorite={ false }
            type={ type }
            id={ id }
            area={ area }
          />
        )
      ));
    return filter;
  }

  function renderDrinksRecipesMade() {
    const vari = JSON.parse(localStorage.getItem('doneRecipes'));
    const filter = vari
      .map(({ id, image, category, name, doneDate, tags, type, area, alcoholicOrNot }, index) => (
        type === 'bebida' && (
          <RecipeDoneCard
            key={ id }
            image={ image }
            category={ category }
            name={ name }
            doneDate={ doneDate }
            tagName={ tags }
            index={ index - 1 }
            shouldFavorite={ false }
            type={ type }
            id={ id }
            area={ area }
            alcoholicOrNot={ alcoholicOrNot }
          />
        )
      ));
    return filter;
  }

  function getRecipesMade({ target }) {
    if (target.name === 'all') {
      setRenderRecipesMade(renderAllRecipesMade());
    }
    if (target.name === 'food') {
      setRenderRecipesMade(renderFoodsRecipesMade());
    }
    if (target.name === 'drink') {
      setRenderRecipesMade(renderDrinksRecipesMade());
    }
  }
  return (
    <>
      <HeaderFoods hassearchbar={ false }>
        <h1 data-testid="page-title">Receitas Feitas</h1>
      </HeaderFoods>
      <button
        type="button"
        name="all"
        data-testid="filter-by-all-btn"
        onClick={ getRecipesMade }
      >
        All
      </button>
      <button
        type="button"
        name="food"
        data-testid="filter-by-food-btn"
        onClick={ getRecipesMade }
      >
        Food
      </button>
      <button
        type="button"
        name="drink"
        data-testid="filter-by-drink-btn"
        onClick={ getRecipesMade }
      >
        Drinks
      </button>
      { renderRecipesMade }
    </>
  );
}

export default RecipesMade;
