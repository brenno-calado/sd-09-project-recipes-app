import React from 'react';
import Header from '../../common/components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Receitas Favoritas" isSearchEnable={ false } />
      <p>Receitas FFavoritas</p>
    </div>
  );
}

export default FavoriteRecipes;
