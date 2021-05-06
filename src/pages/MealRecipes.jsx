import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

const MealRecipes = () => {
  const [mealRecipes, setMealRecipes] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState({ active: false, filter: '' });

  const getDefaultRecipes = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => {
        response.json()
          .then((data) => {
            setMealRecipes(data.meals);
          });
      });
  };

  const getRecipesById = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
      .then((response) => {
        console.log(response);
        response.json()
          .then((data) => {
            setMealRecipes(data.meals);
          });
      });
  };

  const handleFilter = (value) => {
    const { active, filter } = activeFilter;

    if (active && filter === value) {
      getDefaultRecipes();
      setActiveFilter({
        active: false,
        filter: '',
      });
    } else {
      getRecipesById(value);
      setActiveFilter({
        active: true,
        filter: value,
      });
    }
  };

  useEffect(() => {
    getDefaultRecipes();
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => {
        response.json()
          .then((data) => {
            setMealCategories(data.meals);
          });
      });
  }, []);

  const maxIndexRecipes = 11;
  const maxIndexCategories = 4;

  return (
    <div>
      <h1>Receitas</h1>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ getDefaultRecipes }
      >
        All
      </button>
      { mealCategories.length > 0
        && mealCategories.map(({ strCategory }, index) => {
          if (index > maxIndexCategories) return;
          return (
            <button
              onClick={ () => handleFilter(strCategory) }
              data-testid={ `${strCategory}-category-filter` }
              type="button"
              key={ strCategory }
            >
              { strCategory }
            </button>
          );
        }) }
      { mealRecipes.length > 0
        && mealRecipes.map((recipe, index) => {
          if (index > maxIndexRecipes) return;
          return (
            <Link
              to={ `/comidas/${recipe.idMeal}` }
              key={ recipe.strMeal }
            >
              <RecipeCard
                img={ recipe.strMealThumb }
                title={ recipe.strMeal }
                index={ index }
              />
            </Link>
          );
        })}
      <Footer />
    </div>

  );
};

export default MealRecipes;
