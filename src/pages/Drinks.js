import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import { useRecipeContext } from '../contexts/recipeContext';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/RecepiCard';

function Drinks() {
  const { handleFetchDrinkClick, recipesData, handleFetchRecipes } = useRecipeContext();
  const twelve = 12;

  useEffect(() => {
    if (recipesData === 'Unexpected end of JSON input'
    || recipesData.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    handleFetchRecipes('thecocktaildb');
  }, [recipesData]);

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
        )}
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
