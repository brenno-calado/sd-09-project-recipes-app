import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { arrayOf, bool } from 'prop-types';
import Lottie from 'react-lottie';
import RecipeItemDrinks from './RecipeItemDrinks';
import RecipeItemFoods from './RecipeItemFoods';
import MealLoading from '../images/lf30_editor_oblwx6ru.json';
import DrinkLoading from '../images/lf30_editor_brwuobfm.json';

function RecipesList({ recipes, loading, path, isFilter }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: path.includes('comidas') ? MealLoading : DrinkLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (loading) {
    return (
      <div className="animates">
        <Lottie
          options={ defaultOptions }
          height={ 400 }
          width={ 400 }
        />
      </div>
    );
  }

  if (!recipes) {
    window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <h2>Faça outra pesquisa</h2>;
  }

  if (recipes.length < 1) {
    return (
      <div className="animates">
        <Lottie
          options={ defaultOptions }
          height={ 400 }
          width={ 400 }
        />
      </div>
    );
  }

  let pageID = 'Meal';
  if (path === '/bebidas') pageID = 'Drink';
  const MAX_RECIPES = 25;

  const renderFoods = () => (
    recipes.map(
      (recipe, index) => index < MAX_RECIPES
      && <RecipeItemFoods key={ index } recipe={ recipe } index={ index } />,
    )
  );

  const renderDrinks = () => (
    recipes.map(
      (recipe, index) => index < MAX_RECIPES
      && <RecipeItemDrinks key={ index } recipe={ recipe } index={ index } />,
    )
  );

  return (
    <div className="list">
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
