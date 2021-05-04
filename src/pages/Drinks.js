import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import { useRecipeContext } from '../contexts/recipeContext';
import BottomMenu from '../components/BottomMenu';
import createRender from '../utils/headerDrinks';
import useHandleClickButtonName from '../hooks/useHandleClickButtonName';

function Drinks() {
  const [drink, setDrink] = useState([]);
  const [listDrinkByCategory, setListDrinkByCategory] = useState([]);
  const [initDrinks, setInitDrinks] = useState([]);
  const [handleClickButtonName, category] = useHandleClickButtonName();
  const { handleFetchDrinkClick,
    recipesData,
    getRecipes,
    getRecipesByCategory,
    getRecipesDrinksFilterByCategory } = useRecipeContext();

  useEffect(() => {
    if (recipesData === 'Unexpected end of JSON input'
      || recipesData.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [recipesData]);

  useEffect(() => {
    getRecipes('thecocktaildb')
      .then(({ drinks }) => setInitDrinks(drinks));
  }, [getRecipes]);

  useEffect(() => {
    getRecipesByCategory('thecocktaildb')
      .then(({ drinks }) => setDrink(drinks));
  }, [getRecipesByCategory]);

  useEffect(() => {
    getRecipesDrinksFilterByCategory(category)
      .then(({ drinks }) => setListDrinkByCategory(drinks || []));
  }, [category]);

  function categoryButtom() {
    const five = 5;
    console.log();
    return (
      drink.map(({ strCategory }, index) => (
        index < five && (
          <div className="category-btn">
            <button
              key={ strCategory }
              type="button"
              name={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ ({ target }) => handleClickButtonName({ target }) }
            >
              { strCategory }
            </button>
          </div>
        )
      ))
    );
  }

  function filterAllButtom() {
    return (
      <button
        type="button"
        data-testid="All-category-filter"
        // onClick={ toggle }
      >
        All
      </button>
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
        { filterAllButtom() }
        {categoryButtom() }
        {listDrinkByCategory.length
          ? createRender(listDrinkByCategory)
          : (initDrinks.length && (createRender(initDrinks))) }
        {searchRender() }
        <BottomMenu />
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
