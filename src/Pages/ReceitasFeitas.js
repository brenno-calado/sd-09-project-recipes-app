import React, { useEffect, useState } from 'react';
import DoneCard from '../components/DoneCard';

function ReceitasFeitas() {
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  useEffect(() => {
    const checkDoneRecipes = () => localStorage.getItem('doneRecipes');
    if (checkDoneRecipes() !== null) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipesList(doneRecipes);
    }
  }, [setDoneRecipesList]);
  const [filter, setFilter] = useState(null);
  const filteredDoneRecipes = doneRecipesList
    .filter((element) => element.type === filter);
  const mapDoneRecipes = (currentDone) => currentDone
    .map((element, index) => (
      <DoneCard
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
        ? mapDoneRecipes(filteredDoneRecipes)
        : mapDoneRecipes(doneRecipesList)}
    </div>
  );
}

export default ReceitasFeitas;
