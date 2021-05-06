import React from 'react';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/RecepiCard';
import filterAllDrinkButton from './filterAllDrinkButton';
import categoryDrinkButton from './categoryDrinkButton';

function headerRenderDrink({
  drink,
  handleClickButtonName,
  handleFetchDrinkClick,
  twelve,
  recipesData,
  setListDrinkByCategory,
  setRecipesData,
  render,

}) {
  const renderSearch = recipesData.drinks && (recipesData.drinks
    .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
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
    )));

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
      { filterAllDrinkButton(setListDrinkByCategory, setRecipesData) }
      {categoryDrinkButton(drink, handleClickButtonName) }

      {recipesData.drinks ? renderSearch : render}

      <BottomMenu />
    </>
  );
}

export default headerRenderDrink;
