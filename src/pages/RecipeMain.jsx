import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import RecipeCard from '../components/RecipeCard';
import MealsAndDrinkContext from '../context/MealsAndDrinkContext';
import { getPageFromURL as isFoodPage } from '../services/others';

function isPromise(promise) {
  return !!promise && typeof promise.then === 'function';
}

const handleCategories = async (setCurrentCategories) => {
  const endpoint = isFoodPage() ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const data = await fetch(endpoint);
  const response = await data.json();
  const result = isFoodPage() ? response.meals : response.drinks;
  const categories = result.map(({ strCategory }) => strCategory);
  categories.unshift('All');
  const maxCategories = 6;
  setCurrentCategories(categories.slice(0, maxCategories));
};

const getFilteredRecipes = async (recipes, filter, setRecipes) => {
  if (filter !== 'All') {
    const endpoint = isFoodPage()
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`
      : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`;
    const response = await fetch(endpoint);
    const result = await response.json();
    const filteredRecipes = isFoodPage() ? result.meals : result.drinks;
    setRecipes(filteredRecipes);
    return;
  }
  setRecipes(recipes);
};

const renderCards = (recipes) => {
  if (recipes.length === 0) {
    return;
  }
  const maxRecipes = 12;
  return recipes.slice(0, maxRecipes)
    .map((recipe, index) => {
      const page = isFoodPage() ? '/comidas/' : '/bebidas/';
      const recipeId = isFoodPage() ? recipe.idMeal : recipe.idDrink;
      const recipeImg = isFoodPage() ? recipe.strMealThumb : recipe.strDrinkThumb;
      const recipeName = isFoodPage() ? recipe.strMeal : recipe.strDrink;
      return (
        <Link to={ `${page}${recipeId}` } key={ index }>
          <RecipeCard
            image={ recipeImg }
            recipeName={ recipeName }
            idRecipe={ recipeId }
            index={ index }
            key={ index }
          />
        </Link>
      );
    });
};

const renderFilter = (categories, filter, setFilter) => {
  if (categories.length === 0 || isPromise(categories)) {
    return;
  }
  return (categories.map((category, index) => (
    <button
      type="button"
      key={ index }
      onClick={ () => (filter === index ? setFilter(0) : setFilter(index)) }
      data-testid={ `${category}-category-filter` }
    >
      {category}
    </button>
  )));
};

function RecipeMain() {
  const { meals, drinks } = useContext(MealsAndDrinkContext);
  const [currentCategories, setCurrentCategories] = useState(['All']);
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState(0);
  const headerTitle = isFoodPage() ? 'Comidas' : 'Bebidas';
  useEffect(() => {
    handleCategories(setCurrentCategories);
  }, []);
  useEffect(() => {
    const currentRecipes = isFoodPage() ? meals : drinks;
    getFilteredRecipes(currentRecipes, currentCategories[filter], setRecipes);
  }, [filter, meals, drinks, currentCategories]);

  return (
    <div className="main-container">
      <Header title={ headerTitle } />
      {renderFilter(currentCategories, filter, setFilter)}
      {renderCards(recipes)}
      <BottomNav />
    </div>
  );
}

export default RecipeMain;
