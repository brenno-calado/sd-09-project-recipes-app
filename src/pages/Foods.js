import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecipeContext } from '../contexts/recipeContext';
import createRender from '../utils/headerFoods';
import useHandleClickButtonName from '../hooks/useHandleClickButtonName';
import headerRenderFoods from '../utils/headerRenderFoods';

function Foods() {
  const [meal, setMeal] = useState([]);
  const [listItemByCategory, setListItemByCategory] = useState([]);
  const [initFood, setInitFood] = useState([]);
  const [render, setRender] = useState([]);
  const [handleClickButtonName, category] = useHandleClickButtonName();
  const twelve = 12;
  const { handleFetchFoodClick,
    recipesData,
    setRecipesData,
    getRecipes,
    getRecipesByCategory,
    getRecipesFoodsFilterByCategory,
    renderRecipesByIngredients } = useRecipeContext();

  const headerFoodParams = {
    meal,
    render,
    handleClickButtonName,
    twelve,
    handleFetchFoodClick,
    recipesData,
    setListItemByCategory,
    setRecipesData,
    renderRecipesByIngredients,
  };

  useEffect(() => {
    handleFetchFoodClick();
  }, [setRecipesData]);

  useEffect(() => {
    if (recipesData === 'Unexpected end of JSON input'
      || recipesData.meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [recipesData, setRecipesData]);

  useEffect(() => {
    getRecipes('themealdb')
      .then(({ meals }) => setInitFood(meals));
  }, [getRecipes]);

  useEffect(() => {
    getRecipesByCategory('themealdb')
      .then(({ meals }) => setMeal(meals));
  }, [getRecipesByCategory]);

  useEffect(() => {
    getRecipesFoodsFilterByCategory(category)
      .then(({ meals }) => setListItemByCategory(meals || []));
    setRecipesData([]);
  }, [category]);

  useEffect(() => {
    if (listItemByCategory.length > 0) {
      setRender(createRender(listItemByCategory));
    } else if (initFood.length) {
      setRender(createRender(initFood));
    }
  }, [initFood, listItemByCategory]);

  if (recipesData.meals) {
    const mealId = recipesData.meals && recipesData.meals.map(({ idMeal }) => idMeal);
    return recipesData.meals.length === 1 ? (<Redirect to={ `/comidas/${mealId}` } />)
      : headerRenderFoods(headerFoodParams);
  }

  return (
    headerRenderFoods(headerFoodParams)
  );
}

export default Foods;
