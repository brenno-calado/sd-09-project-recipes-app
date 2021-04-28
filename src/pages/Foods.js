import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';
import {
  fetchFoodsAPI,
  fetchFoodsCategoryAPI,
} from '../services/fetchFoodsAPI';

const imgStyle = {
  maxWidth: '150x',
  maxHeight: '150px',
  margin: 'auto',
};

// a tela é 360 x 640
const containerStyle = {
  overflowY: 'scroll',
  width: '300px',
  maxHeight: '300px',
  marginTop: '100px',
};

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
    <div>
      <Header title="Comidas" />
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
      <div style={ containerStyle }>
        {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Link key={ idMeal } to={ `/comidas/${idMeal}` }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ strMealThumb }
                style={ imgStyle }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
