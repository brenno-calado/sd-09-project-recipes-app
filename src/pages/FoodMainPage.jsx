import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import { searchBarFetch } from '../actions/searchBar';
import { filtersFetch } from '../actions/filters';
import Filters from '../components/Filters';

function FoodMainPage({ match, setRecipes, setFilters }) {
  useEffect(() => {
    setRecipes({ searchValue: '', query: 's', page: 'Comidas' });
    setFilters('Comidas');
  }, [setRecipes, setFilters]);
  return (
    <div>
      <Header page="Comidas" search />
      <Filters />
      <RecipesList path={ match.path } />
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (search) => dispatch(searchBarFetch(search)),
  setFilters: (page) => dispatch(filtersFetch(page)),
});

FoodMainPage.propTypes = {
  match: object,
}.isRequired;

export default connect(null, mapDispatchToProps)(FoodMainPage);
