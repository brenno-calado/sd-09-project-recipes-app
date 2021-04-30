import React, { useContext, useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import MealsAndDrinkContext from '../context/MealsAndDrinkContext';

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
    .map((recipe, index) => (
      <RecipeCard
        image={ recipe.strMealThumb }
        recipeName={ recipe.strMeal }
        index={ index }
        key={ index }
      />
    )));
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
  const { meals } = useContext(MealsAndDrinkContext);
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    const recipes = meals ? handleRecipes(meals) : [];
    const categories = meals ? handleCategories(meals) : [];
    setCurrentRecipes(recipes);
    setCurrentCategories(categories);
  }, [meals]);

  return (
    <div className="main-container">
      {renderFilter(currentCategories, filter, setFilter)}
      {renderCards(currentRecipes, currentCategories[filter])}
    </div>
  );
}

export default RecipeMain;
