import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../../common/components/Header';
import RecipesContext from '../../context/RecipesContext';
import DoneFavRecipeCard from '../../common/components/DoneFavRecipeCard';
import DoneFavButtons from '../../common/components/buttons/DoneFavButtons';

function DoneRecipes({ history }) {
  const { doneFav, resetFilter } = useContext(RecipesContext);

  useEffect(() => {
    resetFilter('doneRecipes');
  }, [resetFilter]);

  return (
    <div>
      <Header title="Receitas Feitas" isSearchEnable={ false } />
      <DoneFavButtons type="doneRecipes" />
      { doneFav.map((recipe, index) => (
        <DoneFavRecipeCard
          history={ history }
          index={ index }
          recipe={ recipe }
          key={ recipe.id }
          favOrDone="done"
        />))}
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DoneRecipes;
