import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import { useRecipeContext } from '../contexts/recipeContext';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/RecepiCard';

function Drinks() {
  const [categoryDrink, setCategoryDrink] = useState([]);
  const { handleFetchDrinkClick,
    recipesData,
    handleFetchRecipes,
    getRecipesByCategory } = useRecipeContext();
  const twelve = 12;

  useEffect(() => {
    if (recipesData === 'Unexpected end of JSON input'
      || recipesData.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [recipesData]);

  useEffect(() => {
    handleFetchRecipes('thecocktaildb');
  }, [handleFetchRecipes]);

  useEffect(() => {
    getRecipesByCategory('thecocktaildb')
      .then(({ drinks }) => setCategoryDrink(drinks));
  }, [getRecipesByCategory]);

  function categoryButtom() {
    const five = 5;
    return (
      categoryDrink.map(({ strCategory }, index) => (
        index < five && (
          <button type="button" data-testid={ `${strCategory}-category-filter` }>
            { strCategory }
          </button>
        )
      ))
    );
  }

  function header() {
    return (
      <>
        <HeaderFoods hassearchbar>
          <h1 data-testid="page-title">Bebidas</h1>
        </HeaderFoods>
        <SearchBar>
          <button
            onClick={ () => { handleFetchDrinkClick(); } }
            data-testid="exec-search-btn"
            type="button"
          >
            Buscar
          </button>
        </SearchBar>
        <BottomMenu />
        {categoryButtom()}
        {recipesData.drinks && (
          recipesData.drinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            index < twelve && (
              <RecipeCard
                key={ idDrink }
                image={ strDrinkThumb }
                name={ strDrink }
                recipeCArdId={ `${index}-recipe-card` }
                cardImageId={ `${index}-card-img` }
                cardNameId={ `${index}-card-name` }
              />
            )
          ))
        ) }
      </>
    );
  }

  if (recipesData.drinks) {
    const drinkId = recipesData.drinks.map(({ idDrink }) => idDrink);
    return recipesData.drinks.length === 1 ? (<Redirect to={ `/bebidas/${drinkId}` } />)
      : header();
  }

  return (
    header()
  );
}

export default Drinks;
