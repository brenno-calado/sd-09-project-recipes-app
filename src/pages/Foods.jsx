import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { fetchMeals } from '../services/fetchRecipes';
import './Styles/Recipes.css';
import { getRecipesAction, shouldFetch } from '../Redux/actions';
import Filters from '../components/Filters';

function Foods({ getRecipes, recipes, itFetch, shouldItFetch }) {
  useEffect(() => {
    if (shouldItFetch) fetchMeals().then((data) => getRecipes(data));
    itFetch();
  }, [getRecipes, itFetch]);

  return (
    <div id="Recipes">
      <Header title="Explorar Comidas" searchBtn />
      <Filters type="Meals" />
      <Cards items={ recipes } idType="idMeal" />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipesList.list,
  shouldItFetch: state.recipesList.shouldFetch,
});

const mapDispatchToProps = (dispatch) => ({
  getRecipes: (data) => dispatch(getRecipesAction(data)),
  itFetch: () => dispatch(shouldFetch()),
});

Foods.propTypes = {
  getRecipes: PropTypes.func,
  recipes: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
