import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getPageTitle from '../services/pageTitles';
import Card from '../components/Card';

const Main = ({ match: { path } }) => {
  const { isFetching, recipes } = useSelector((state) => state.recipes);
  const max = 12;
  const shownRecipes = recipes.slice(0, max);
  const history = useHistory();
  const currentLocation = history.location.pathname;
  const isSingleRecipe = recipes.length === 1;
  if (isSingleRecipe) {
    const recipe = recipes[0];
    const recipeId = recipe.idDrink || recipe.idMeal;
    history.push(`${currentLocation}/${recipeId}`);
  }
  return (
    <>
      <Header activeSearch title={ getPageTitle(path) } />
      {isFetching ? 'loading...' : shownRecipes
        .map((recipe, index) => <Card key={ index } recipe={ recipe } index={ index } />)}
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
