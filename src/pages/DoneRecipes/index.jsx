import React, { useContext, useState } from 'react';
import Header from '../../components/Header';
import ListDoneRecipeCards from '../../components/ListDoneRecipeCard';
import { setInitialLocalStorage } from '../../services/localStorage';
import { context } from '../../context';

const FILTER_OPTIONS = {
  all: 'All',
  food: 'Food',
  drink: 'Drink',
};
function DoneRecipes() {
  const { doneRecipes } = useContext(context);
  const [doneFilteredRecipes, setFilteredRecipes] = useState(
    setInitialLocalStorage('doneRecipes'),
  );

  const handleFilter = (option) => {
    console.log(option);
    console.log(doneRecipes);
    if (option === 'all' && doneRecipes) {
      setFilteredRecipes(doneRecipes);
    }
    if (option === 'food' && doneRecipes) {
      const filter = doneRecipes.filter(
        (recipe) => {
          console.log(recipe);
          return recipe.type === 'comida';
        },
      );
      setFilteredRecipes(filter);
    }
    if (option === 'drink' && doneRecipes) {
      const filter = doneRecipes.filter((recipe) => {
        console.log(recipe);
        return recipe.type === 'bebida';
      });
      setFilteredRecipes(filter);
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
      <Header title="Receitas Feitas" />
      {renderFilterButtons()}
      <ListDoneRecipeCards
        done={ doneFilteredRecipes }
      />
    </>
  );
}

export default DoneRecipes;
