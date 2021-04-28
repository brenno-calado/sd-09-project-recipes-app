import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import { useRecipeContext } from '../contexts/recipeContext';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/RecepiCard';

function Foods() {
  const { handleFetchFoodClick, recipesData } = useRecipeContext();
  const twelve = 12;

  useEffect(() => {
    if (recipesData === 'Unexpected end of JSON input'
    || recipesData.meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [recipesData]);

  function header() {
    return (
      <>
        <HeaderFoods hassearchbar>
          <h1 data-testid="page-title">Comidas</h1>
        </HeaderFoods>
        <SearchBar>
          <button
            onClick={ () => { handleFetchFoodClick(); } }
            data-testid="exec-search-btn"
            type="button"
          >
            Buscar
          </button>
        </SearchBar>
        <BottomMenu />
        {recipesData.meals && (
          recipesData.meals.map(({ idMeal, strMealThumb, strMeal }, index) => (
            index < twelve && (
              <RecipeCard
                key={ idMeal }
                image={ strMealThumb }
                name={ strMeal }
                recipeCArdId={ `${index}-recipe-card` }
                cardImageId={ `${index}-card-img` }
                cardNameId={ `${index}-card-name` }
              />
            )
          ))
        )}
      </>
    );
  }

  if (recipesData.meals) {
    const mealId = recipesData.meals.map(({ idMeal }) => idMeal);
    return recipesData.meals.length === 1 ? (<Redirect to={ `/comidas/${mealId}` } />)
      : header();
  }

  return (
    header()
  );
}

export default Foods;
