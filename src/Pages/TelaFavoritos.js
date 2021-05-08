import React, { useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';

export default function TelaFavoritos() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favoriteRecipes);
  const [filter, setFilter] = useState('');
  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        // onClick={ setFilter('') }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        // onClick={ setFilter('comida') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        // onClick={ setFilter('bebida') }
      >
        Drinks
      </button>
      {favoriteRecipes.map((element, index) => (
        < FavoriteCard index={ index } data={ element } />
      ))}
    </div>
  );
}
