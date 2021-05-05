import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';
import {
  fetchFoodsAPI,
  fetchFoodsCategoryAPI,
} from '../services/fetchFoodsAPI';
import '../css/Foods.css';

export default function Foods() {
  const { recipesFoods, foodCategories, setRecipesFoods } = useContext(myContext);
  const [toggle, setToggle] = useState('');

  const MAX_LENGTH_RECIPES = 12;
  const recipes = recipesFoods.slice(0, MAX_LENGTH_RECIPES);

  const MAX_LENGTH_CATEGORIES = 5;
  const categories = foodCategories.slice(0, MAX_LENGTH_CATEGORIES);

  const handleClick = async ({ target }) => {
    if (target.textContent === toggle) {
      const allCategoriesRecipes = await fetchFoodsAPI();
      setRecipesFoods(allCategoriesRecipes);
      return;
    }

    if (target.textContent !== 'All') {
      const categoryRecipes = await fetchFoodsCategoryAPI(target.textContent);
      setToggle(target.textContent);
      setRecipesFoods(categoryRecipes);
      return;
    }

    const allCategoriesRecipes = await fetchFoodsAPI();
    setRecipesFoods(allCategoriesRecipes);
  };

  return (
    <div className="foods-body">
      <Header title="Comidas" />
      <div className="filter-button-container">
        <button
          type="button"
          onClick={ handleClick }
          data-testid="All-category-filter"
        >
          All
        </button>
        {categories.map(({ strCategory }) => (
          <button
            type="button"
            key={ strCategory }
            onClick={ handleClick }
            data-testid={ `${strCategory}-category-filter` }
          >
            { strCategory }
          </button>
        ))}
      </div>
      <div className="recipe-container">
        {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Link
            key={ idMeal }
            to={ `/comidas/${idMeal}` }
            className="recipe-card"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
