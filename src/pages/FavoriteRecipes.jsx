import React, { useContext, useEffect, useState } from 'react';
import RecipeCardDone from '../components/RecipeCardDone';
import AppContext from '../contextApi/context';

const FavoriteRecipes = () => {
  const { favoriteRecipes } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const [filterApllied, setFilterApplied] = useState('all');

  useEffect(() => {
    setRecipes(favoriteRecipes);
  }, [favoriteRecipes]);

  const filterRecipes = (type) => {
    if (filterApllied === type) {
      setFilterApplied('all');
      setRecipes(favoriteRecipes);
    }
    switch (type) {
    case 'all':
      setFilterApplied('all');
      setRecipes(favoriteRecipes);
      break;
    case 'food':
      setFilterApplied('food');
      setRecipes(favoriteRecipes.filter((recipe) => !recipe.alcoholicOrNot));
      break;
    case 'drinks':
      setFilterApplied('drinks');
      setRecipes(favoriteRecipes.filter((recipe) => recipe.alcoholicOrNot));
      break;
    default: break;
    }
  };

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drinks') }
        >
          Drinks
        </button>
      </div>
      {recipes.length && recipes
        .map((recipe, index) => (
          <RecipeCardDone
            index={ index }
            recipe={ recipe }
            key={ recipe.id }
          />))}
    </div>
  );
};

export default FavoriteRecipes;
