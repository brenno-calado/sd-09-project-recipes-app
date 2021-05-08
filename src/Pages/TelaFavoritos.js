import React, { useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';

export default function TelaFavoritos() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favoriteRecipes);
  const [filter, setFilter] = useState(null);

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
      {filter ? favoriteRecipes
        .filter((element) => element.type === filter)
        .map((element, index) => (
          <FavoriteCard key={ index } data={ element } />))
        : favoriteRecipes.map((element, index) => (
          <FavoriteCard key={ index } data={ element } />))}
    </div>
  );
}
