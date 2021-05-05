import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import RecipeCard from '../components/RecipeCard';
import MealsAndDrinkContext from '../context/MealsAndDrinkContext';
import { getPageFromURL as isFoodPage } from '../services/others';

const handleRecipes = (data) => {
  const maxRecipes = 12;
  return data.slice(0, maxRecipes);
};

const handleCategories = (data) => {
  const categories = data.map(({ strCategory }) => strCategory);
  categories.unshift('All');
  const maxCategories = 6;
  return categories.filter((item, index) => categories
    .indexOf(item) === index).slice(0, maxCategories);
};

const renderCards = (recipes, filter) => {
  if (recipes.length === 0) {
    return;
  }
  return (recipes.filter((recipe) => {
    if (filter === 'All') return true;
    if (recipe.strCategory === filter) return true;
    return false;
  })
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
    }));
};

const renderFilter = (categories, filter, setFilter) => {
  if (categories.length === 0) {
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
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [filter, setFilter] = useState(0);
  const headerTitle = isFoodPage() ? 'Comidas' : 'Bebidas';
  useEffect(() => {
    const recipes = isFoodPage() ? handleRecipes(meals) : handleRecipes(drinks);
    const categories = isFoodPage() ? handleCategories(meals) : handleCategories(drinks);
    setCurrentRecipes(recipes);
    setCurrentCategories(categories);
  }, [meals, drinks]);

  return (
    <div className="main-container">
      <Header title={ headerTitle } />
      {renderFilter(currentCategories, filter, setFilter)}
      {renderCards(currentRecipes, currentCategories[filter])}
      <BottomNav />
    </div>
  );
}

export default RecipeMain;
