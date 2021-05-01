import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderFoods from '../components/HeaderFoods';
import SearchBar from '../components/SearchBar';
import { useRecipeContext } from '../contexts/recipeContext';
import BottomMenu from '../components/BottomMenu';
import RecipeCard from '../components/RecepiCard';

function Foods() {
  const [meal, setMeal] = useState([]);
  const [getSelectedCategory, setGetSelectedCategory] = useState();
  const [listItemByCategory, setListItemByCategory] = useState([]);
  const [checked, setChecked] = useState(false);

  const { handleFetchFoodClick,
    recipesData,
    handleFetchRecipes,
    getRecipesByCategory,
    getRecipesFoodsFilterByCategory } = useRecipeContext();
  const twelve = 12;

  useEffect(() => {
    if (recipesData === 'Unexpected end of JSON input'
      || recipesData.meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [recipesData]);

  useEffect(() => {
    handleFetchRecipes('themealdb');
  }, [handleFetchRecipes]);

  useEffect(() => {
    getRecipesByCategory('themealdb')
      .then(({ meals }) => setMeal(meals));
  }, [getRecipesByCategory]);

  useEffect(() => {
    if (checked) {
      getRecipesFoodsFilterByCategory(getSelectedCategory)
        .then(({ meals }) => setListItemByCategory(meals || []));
    }
  }, [getSelectedCategory]);

  const toggle = () => { if (checked) setListItemByCategory([]); };

  const handleClick = ({ target }) => {
    setGetSelectedCategory(target.name);
    setChecked(!checked);
    toggle();
  };

  function categoryButtom() {
    const five = 5;
    return (
      meal.map(({ strCategory }, index) => (
        index < five && (
          <div className="categoty-btn">
            <button
              key={ strCategory }
              type="button"
              name={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ ({ target }) => handleClick({ target }) }
            >
              { strCategory }
            </button>
          </div>
        )
      ))
    );
  }

  function createRender(list) {
    return list.map(({ idMeal, strMealThumb, strMeal }, index) => (
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
    ));
  }

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
        {categoryButtom() }
        { listItemByCategory.length
          ? createRender(listItemByCategory)
          : (recipesData.meals && (createRender(recipesData.meals))) }
        <BottomMenu />
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
