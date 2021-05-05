import React, { useState } from 'react';
import Header from '../components/Header';
import HorizontalCard from '../components/HorizontalCard';

function FavoriteRecipes() {
  const storedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const [shownRecipes, setShownRecipes] = useState(storedRecipes);

  const handleFilter = (filter) => {
    if (filter === undefined) return setShownRecipes(storedRecipes);
    return setShownRecipes(storedRecipes.filter((recipe) => recipe.type === filter));
  };

  const removeFav = (removed) => {
    const updatedStore = storedRecipes.filter((_, index) => index !== removed);
    setShownRecipes(updatedStore);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedStore));
  };

  return (
    <div className="center">
      <Header title=" Receitas Feitas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilter() }
        disabled={ !storedRecipes }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => handleFilter('comida') }
        disabled={ !storedRecipes }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilter('bebida') }
        disabled={ !storedRecipes }
      >
        Drinks
      </button>
      { !shownRecipes || shownRecipes.length === 0 ? <h4>no favorite recipe stored</h4>
        : shownRecipes.map((recipe, index) => (
          <HorizontalCard
            key={ index }
            index={ index }
            recipe={ recipe }
            removeFav={ removeFav }
          />)) }
    </div>
  );
}

export default FavoriteRecipes;
