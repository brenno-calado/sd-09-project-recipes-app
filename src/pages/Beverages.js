import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';
import {
  fetchDrinksAPI,
  fetchDrinksCategoryAPI,
} from '../services/fetchDrinksAPI';
import '../css/Beverages.css';

const imgStyle = {
  maxWidth: '150x',
  maxHeight: '150px',
  margin: 'auto',
};

export default function Beverages() {
  const { recipesDrinks, drinkCategories, setRecipesDrinks } = useContext(myContext);
  const [toggle, setToggle] = useState('');

  const MAX_LENGTH_RECIPES = 12;
  const recipes = recipesDrinks.slice(0, MAX_LENGTH_RECIPES);

  const MAX_LENGTH_CATEGORIES = 5;
  const categories = drinkCategories.slice(0, MAX_LENGTH_CATEGORIES);

  const handleClick = async ({ target }) => {
    if (target.textContent === toggle) {
      const allCategoriesRecipes = await fetchDrinksAPI();
      setRecipesDrinks(allCategoriesRecipes);
      return;
    }

    if (target.textContent !== 'All') {
      const categoryRecipes = await fetchDrinksCategoryAPI(target.textContent);
      setToggle(target.textContent);
      setRecipesDrinks(categoryRecipes);
      return;
    }

    const allCategoriesRecipes = await fetchDrinksAPI();
    setRecipesDrinks(allCategoriesRecipes);
  };

  return (
    <div className="drinks-body">
      <Header title="Bebidas" />
      <div className="drinks-filter-container">
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
      <div className="drinks-recipe-container">
        {recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <Link
            key={ idDrink }
            to={ `/bebidas/${idDrink}` }
            className="drinks-recipe-card"
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${index}-card-img` }
              style={ imgStyle }
            />
            <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
