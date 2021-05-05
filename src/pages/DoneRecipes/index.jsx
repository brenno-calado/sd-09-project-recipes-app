import React from 'react';
// import React, { useContext, useState } from 'react';

// import Header from '../../components/Header';
// import ListDoneRecipeCards from '../../components/ListDoneRecipeCard';
// import { context } from '../../context';
// import { setInitialLocalStorage } from '../../services/localStorage';

// const FILTER_OPTIONS = {
//   all: 'All',
//   food: 'Food',
//   drink: 'Drink',
// };

function DoneRecipes() {
  // const { doneRecipes } = useContext(context);
  // const [doneFilteredRecipes, setFilteredRecipes] = useState(
  //   setInitialLocalStorage('doneRecipes'),
  // );

  // const handleFilter = (option) => {
  //   if (option === 'all' && doneRecipes) {
  //     setFilteredRecipes(doneRecipes);
  //   }
  //   if (option === 'food' && doneRecipes) {
  //     const filter = doneRecipes.filter(
  //       (recipe) => recipe.type === 'comida',
  //     );
  //     setFilteredRecipes(filter);
  //   }
  //   if (option === 'drink' && doneFilteredRecipes) {
  //     const filter = doneFilteredRecipes.filter((recipe) => recipe.type === 'bebida');
  //     setFilteredRecipes(filter);
  //   }
  // };

  // const renderFilterButtons = () => Object.keys(FILTER_OPTIONS).map((option) => (
  //   <button
  //     key={ option }
  //     type="button"
  //     data-testid={ `filter-by-${option}-btn` }
  //     onClick={ handleFilter.bind(null, option) }
  //   >
  //     {FILTER_OPTIONS[option]}
  //   </button>
  // ));

  return (
    <>
      {/* <Header title="Receitas Favoritas" />
      {renderFilterButtons()}
      <ListDoneRecipeCards
        done={ doneRecipes }
      />
      <h1>Pronto</h1> */}
      <h1>Eita</h1>
      <p>dssdds</p>
    </>
  );
}

export default DoneRecipes;
