import React, { useEffect, useState } from 'react';
import CardDoneRecipe from '../../Components/CardDoneRecipe/CardDoneRecipe';
import Header from '../../Components/Header/Header';

function DoneRecipiesScreen() {
  const [doneRecipes, setDoneRecipes] = useState();
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (!doneRecipes) {
      const doneRecipesFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipesFromLocalStorage) {
        setDoneRecipes(doneRecipesFromLocalStorage);
        return setFilteredRecipes(doneRecipesFromLocalStorage);
      }
      setDoneRecipes([]);
    }
  }, [setDoneRecipes, doneRecipes]);

  const handleFilter = ({ target: { value } }) => {
    console.log(filteredRecipes);
    console.log(value);
    switch (value) {
    case 'All':
      return setFilteredRecipes(doneRecipes);
    case 'Food':
      return setFilteredRecipes(doneRecipes.filter((recipe) => recipe.type === 'comida'));
    case 'Drinks':
      return setFilteredRecipes(doneRecipes.filter((recipe) => recipe.type === 'bebida'));
    default:
      break;
    }
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
      { ['All', 'Food', 'Drinks'].map((button) => (
        <button
          key={ button }
          type="button"
          data-testid={ `filter-by-${button.toLowerCase().replace('s', '')}-btn` }
          value={ button }
          onClick={ handleFilter }
        >
          { button }
        </button>
      ))}
      { (doneRecipes && filteredRecipes.length > 0) && filteredRecipes
        .map((recipe, index) => (
          <CardDoneRecipe key={ recipe.name } recipe={ recipe } index={ index } />))}
    </div>
  );
}

export default DoneRecipiesScreen;
