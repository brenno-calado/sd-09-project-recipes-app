import React, { useContext, useState } from 'react';
import ListFavoriteCards from '../../components/ListFavoriteCards';

import Header from '../../components/Header';
import { context } from '../../context';
import { setInitialLocalStorage } from '../../services/localStorage';

const FILTER_OPTIONS = {
  all: 'All',
  food: 'Food',
  drink: 'Drink',
};

function FavoriteRecipes() {
  const { favoriteRecipes } = useContext(context);
  const [filteredFood, setFilteredFood] = useState(
    setInitialLocalStorage('favoriteRecipes'),
  );

  const handleFilter = (option) => {
    if (option === 'all' && favoriteRecipes) {
      setFilteredFood(favoriteRecipes);
    }
    if (option === 'food' && favoriteRecipes) {
      const filter = favoriteRecipes.filter(
        (recipe) => recipe.type === 'comida',
      );
      setFilteredFood(filter);
    }
    if (option === 'drink' && filteredFood) {
      const filter = filteredFood.filter((recipe) => recipe.type === 'bebida');
      setFilteredFood(filter);
    }
  };

  const renderFilterButtons = () => Object.keys(FILTER_OPTIONS).map((option) => (
    <button
      key={ option }
      type="button"
      data-testid={ `filter-by-${option}-btn` }
      onClick={ handleFilter.bind(null, option) }
    >
      {FILTER_OPTIONS[option]}
    </button>
  ));

  return (
    <>
      <Header title="Receitas Favoritas" />
      {renderFilterButtons()}
      <ListFavoriteCards
        handleFavoriteState={ setFilteredFood }
        favorite={ filteredFood }
      />
      <h1>Pronto</h1>
    </>
  );
}

export default FavoriteRecipes;
