import React, { Component } from 'react';
import Header from '../components/Header';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

class ReceitasFavoritas extends Component {
  render() {
    const searchIcon = false;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipes);
    return (
      <div>
        <Header title="Receitas Favoritas" searchIcon={ searchIcon } />
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
        { favoriteRecipes.map((recipe, index) => (
          <FavoriteRecipeCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
          />)) }
      </div>
    );
  }
}

export default ReceitasFavoritas;
