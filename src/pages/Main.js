import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearRecipes } from '../redux/actions/recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import getPageTitle from '../services/pageTitles';
import Card from '../components/Card';

const noRecipeMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

const renderRecipes = (recipes) => recipes
  .map((recipe, index) => <Card key={ index } recipe={ recipe } index={ index } />);

const Main = ({ match: { path } }) => {
  const { isFetching, recipes } = useSelector((state) => state.recipes);
  const maxRecipesShown = 12;
  const history = useHistory();
  const dispatch = useDispatch();

  let shownRecipes = [];

  if (recipes) {
    shownRecipes = recipes.slice(0, maxRecipesShown);
    const { location: { pathname } } = history;
    const isSingleRecipe = recipes.length === 1;
    if (isSingleRecipe) {
      const recipe = recipes[0];
      const recipeId = recipe.idDrink || recipe.idMeal;
      history.push(`${pathname}/${recipeId}`);
    }
  } else {
    dispatch(clearRecipes());
    alert(noRecipeMsg);
  }

  return (
    <>
      <Header activeSearch title={ getPageTitle(path) } />
      {isFetching ? <Loading /> : renderRecipes(shownRecipes)}
      <Footer />
    </>
  );
};

export default Main;

Main.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
