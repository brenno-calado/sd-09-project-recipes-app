import React, { useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';

export default function TelaFavoritos() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filter, setFilter] = useState(null);
  const filteredFavoriteRecipes = favoriteRecipes
    .filter((element) => element.type === filter);
  const mapFavoriteRecipes = (currentFavorites) => currentFavorites
    .map((element, index) => (
      <FavoriteCard
        key={ index }
        index={ index }
        element={ element }
      />));
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilter(null) }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setFilter('comida') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </button>
      {filter
        ? mapFavoriteRecipes(filteredFavoriteRecipes)
        : mapFavoriteRecipes(favoriteRecipes)}
    </div>
  );
}
