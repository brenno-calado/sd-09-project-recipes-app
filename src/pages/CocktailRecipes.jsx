import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

const CocktailRecipes = () => {
  const [cocktailRecipes, setCocktailRecipes] = useState([]);
  const [cocktailCategories, setCocktailCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState({ active: false, filter: '' });

  const getDefaultRecipes = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => {
        console.log(response);
        response.json()
          .then((data) => {
            setCocktailRecipes(data.drinks);
          });
      });
  };

  const getRecipesById = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`)
      .then((response) => {
        response.json()
          .then((data) => {
            setCocktailRecipes(data.drinks);
          });
      });
  };

  useEffect(() => {
    getDefaultRecipes();
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => {
        response.json()
          .then((data) => {
            setCocktailCategories(data.drinks);
          });
      });
  }, []);

  const maxIndexRecipes = 11;
  const maxIndexCategories = 4;

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
      { cocktailCategories.length > 0
        && cocktailCategories.map(({ strCategory }, index) => {
          if (index > maxIndexCategories) return;
          return (
            <button
              data-testid={ `${strCategory}-category-filter` }
              type="submit"
              key={ strCategory }
              onClick={ () => handleFilter(strCategory) }
            >
              {strCategory}
            </button>
          );
        }) }
      { cocktailRecipes.length > 0
        && cocktailRecipes.map((recipe, index) => {
          if (index > maxIndexRecipes) {
            return;
          }
          return (
            <Link
              to={ `/bebidas/${recipe.idDrink}` }
              key={ recipe.strDrink }
            >
              <RecipeCard
                img={ recipe.strDrinkThumb }
                title={ recipe.strDrink }
                index={ index }
              />
            </Link>

          );
        })}
    </div>

  );
};

export default CocktailRecipes;
