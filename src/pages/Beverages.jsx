import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { fetchBeverages } from '../services/fetchRecipes';
import './Styles/Recipes.css';
import { getRecipesAction, shouldFetch } from '../Redux/actions';
import Filters from '../components/Filters';

function Beverages({ getRecipes, recipes, itFetch, shouldItFetch }) {
  useEffect(() => {
    if (shouldItFetch) fetchBeverages().then((data) => getRecipes(data));
    itFetch();
  }, [getRecipes, itFetch]);

  return (
    <div id="Recipes">
      <Header title="Explorar Bebidas" searchBtn />
      <Filters type="Drinks" />
      <Cards items={ recipes } idType="idDrink" />
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

Beverages.propTypes = {
  getRecipes: PropTypes.func,
  recipes: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Beverages);
