import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const CocktailRecipes = () => {
  const [cocktailRecipes, setCocktailRecipes] = useState([]);
  const [cocktailCategories, setCocktailCategories] = useState([]);
  const [activeFilter, setActiveFilterStatus] = useState(false);

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
    fetch('www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
      .then((response) => {
        console.log(response);
        response.json()
          .then((data) => {
            console.log(data);
            setCocktailRecipes(data.drinks);
          })
          .catch((err) => console.log(err));
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
    if (activeFilter) {
      getDefaultRecipes();
      setActiveFilterStatus(false);
    } else {
      getRecipesById(value);
      setActiveFilterStatus(true);
    }
  };

  return (
    <div>
      <h1>Receitas</h1>
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
            <RecipeCard
              key={ recipe.strDrink }
              img={ recipe.strDrinkThumb }
              title={ recipe.strDrink }
              index={ index }
            />
          );
        })}
    </div>

  );
};

export default CocktailRecipes;
