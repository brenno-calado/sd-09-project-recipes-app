import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import { searchBarFetch } from '../actions/searchBar';
import { filtersFetch } from '../actions/filters';
import Filters from '../components/Filters';

function DrinkMainPage({ match, setRecipes, setFilters }) {
  useEffect(() => {
    setRecipes({ searchValue: '', query: 's', page: 'Bebidas' });
    setFilters('Bebidas');
  }, [setRecipes, setFilters]);
  return (
    <div>
      <Header page="Bebidas" search />
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

DrinkMainPage.propTypes = {
  match: object,
}.isRequired;

export default connect(null, mapDispatchToProps)(DrinkMainPage);
