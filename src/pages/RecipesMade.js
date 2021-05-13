import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import HeaderFoods from '../components/HeaderFoods';
import RecipeDoneCard from '../components/RecipeDoneCard';
import styles from './recipesMade.module.css';

function RecipesMade() {
  const [recipesMadeButton, setRecipesMadeButton] = useState();
  const [renderRecipesMade, setRenderRecipesMade] = useState();

  useEffect(() => {
    setRecipesMadeButton(recipesMadeButton);
  }, [recipesMadeButton]);

  function renderAllRecipesMade() {
    const allRecipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (allRecipesDone) {
      const filter = allRecipesDone.map(
        (
          {
            id,
            image,
            category,
            name,
            doneDate,
            tags,
            type,
            area,
            alcoholicOrNot,
          },
          index,
        ) => (
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
        ),
      );
      return filter;
    }
  }

  useEffect(() => {
    setRenderRecipesMade(renderAllRecipesMade());
  }, []);

  function renderFoodsRecipesMade() {
    const doneFoods = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneFoods) {
      const filter = doneFoods
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
  }

  function renderDrinksRecipesMade() {
    const doneDrinks = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneDrinks) {
      const filter = doneDrinks.map(
        (
          {
            id,
            image, category, name, doneDate, tags, type, area, alcoholicOrNot }, index,
        ) => (
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
        ),
      );
      return filter;
    }
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
    <div className={ styles.doneRecipesContainer }>
      <HeaderFoods hasSearchBar={ false }>
        <h2 data-testid="page-title">Receitas Feitas</h2>
      </HeaderFoods>
      <ButtonGroup className="mb-2" style={ { width: '97%', margin: ' 3px 1.35%' } }>
        <Button
          variant="outline-danger"
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ getRecipesMade }
        >
          All
        </Button>
        <Button
          variant="outline-danger"
          type="button"
          name="food"
          data-testid="filter-by-food-btn"
          onClick={ getRecipesMade }
        >
          Food
        </Button>
        <Button
          variant="outline-danger"
          type="button"
          name="drink"
          data-testid="filter-by-drink-btn"
          onClick={ getRecipesMade }
        >
          Drinks
        </Button>
      </ButtonGroup>
      { renderRecipesMade }
    </div>
  );
}

export default RecipesMade;
