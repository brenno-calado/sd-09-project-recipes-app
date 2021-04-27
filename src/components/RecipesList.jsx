import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { arrayOf, bool } from 'prop-types';
import RecipeItemDrinks from './RecipeItemDrinks';
import RecipeItemFoods from './RecipeItemFoods';

function RecipesList({ recipes, loading, path, isFilter }) {
  if (loading) return <h2>Loading</h2>;
  if (!recipes) {
    window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <h2>Faça outra pesquisa</h2>;
  }
  if (recipes.length < 1) return <h2>Loading</h2>;

  let pageID = 'Meal';
  if (path === '/bebidas') pageID = 'Drink';
  const MAX_RECIPES = 12;

  const renderFoods = () => (
    recipes.map(
      (recipe, index) => index < MAX_RECIPES
      && <RecipeItemFoods recipe={ recipe } index={ index } />,
    )
  );

  const renderDrinks = () => (
    recipes.map(
      (recipe, index) => index < MAX_RECIPES
      && <RecipeItemDrinks recipe={ recipe } index={ index } />,
    )
  );

  return (
    <div>
      { (recipes.length === 1 && !isFilter)
      && <Redirect to={ `${path}/${recipes[0][`id${pageID}`]}` } /> }
      { path === '/comidas' ? renderFoods() : renderDrinks() }
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.setData.data,
  loading: state.setData.loading,
  page: state.setPage.page,
  isFilter: state.setData.isFilter,
});

RecipesList.propTypes = {
  recipes: arrayOf({}),
  loading: bool,
}.isRequired;

export default connect(mapStateToProps)(RecipesList);
