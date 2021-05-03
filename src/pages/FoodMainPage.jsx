import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import { searchBarFetch } from '../actions/searchBar';
import { filtersFetch } from '../actions/filters';
import Filters from '../components/Filters';

function FoodMainPage({ match, setRecipes, setFilters, ingredient }) {
  useEffect(() => {
    console.log(ingredient);
    if (ingredient) {
      setRecipes({ searchValue: ingredient, query: 'i', page: 'Comidas' });
    } else {
      setRecipes({ searchValue: '', query: 's', page: 'Comidas' });
    }
    setFilters('Comidas');
  }, [setRecipes, setFilters, ingredient]);
  return (
    <div>
      <Header page="Comidas" search />
      <Filters path={ match.path } />
      <RecipesList path={ match.path } />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  ingredient: state.setIngredients.ingredient,
});

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (search) => dispatch(searchBarFetch(search)),
  setFilters: (page) => dispatch(filtersFetch(page)),
});

FoodMainPage.propTypes = {
  match: object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FoodMainPage);
