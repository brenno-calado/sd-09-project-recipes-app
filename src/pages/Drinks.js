import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecipeContext } from '../contexts/recipeContext';
import useHandleClickButtonName from '../hooks/useHandleClickButtonName';
import createRender from '../utils/headerDrinks';

import headerRenderDrink from '../utils/headerRenderDrink';

function Drinks() {
  const [drink, setDrink] = useState([]);
  const [listDrinkByCategory, setListDrinkByCategory] = useState([]);
  const [initDrinks, setInitDrinks] = useState([]);
  const [render, setRender] = useState();
  const [handleClickButtonName, category] = useHandleClickButtonName();
  const twelve = 12;
  const { handleFetchDrinkClick,
    recipesData,
    getRecipes,
    getRecipesByCategory,
    getRecipesDrinksFilterByCategory,
    setRecipesData } = useRecipeContext();

  const headerParams = {
    drink,
    listDrinkByCategory,
    initDrinks,
    handleClickButtonName,
    handleFetchDrinkClick,
    twelve,
    recipesData,
    setListDrinkByCategory,
    setRecipesData,
    render,
  };
  useEffect(() => {
    handleFetchDrinkClick();
  }, [setRecipesData]);

  useEffect(() => {
    if (recipesData === 'Unexpected end of JSON input'
      || recipesData.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [recipesData, setRecipesData]);

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
    setRecipesData([]);
  }, [category]);

  useEffect(() => {
    if (listDrinkByCategory.length > 0) {
      setRender(createRender(listDrinkByCategory));
    } else if (initDrinks.length > 0) {
      setRender(createRender(initDrinks));
    }
  }, [initDrinks, listDrinkByCategory]);

  if (recipesData.drinks) {
    const drinkId = recipesData.drinks.map(({ idDrink }) => idDrink);
    return recipesData.drinks.length === 1 ? (<Redirect to={ `/bebidas/${drinkId}` } />)
      : headerRenderDrink(headerParams);
  }

  return (
    headerRenderDrink(headerParams)
  );
}

export default Drinks;
