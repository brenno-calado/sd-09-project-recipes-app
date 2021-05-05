import React, { useEffect } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import { searchBarFetch, isFetching } from '../actions/searchBar';
import { filtersFetch } from '../actions/filters';
import Filters from '../components/Filters';

function DrinkMainPage({ match, setRecipes, setFilters, ingredient, setLoadingExit }) {
  useEffect(() => {
    if (ingredient) {
      setRecipes({ searchValue: ingredient, query: 'i', page: 'Bebidas' });
    } else {
      setRecipes({ searchValue: '', query: 's', page: 'Bebidas' });
    }
    setFilters('Bebidas');
  }, [setRecipes, setFilters, setLoadingExit, ingredient]);

  return (
    <div>
      <Header page="Bebidas" search />
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
  setLoadingExit: () => dispatch(isFetching()),
});

DrinkMainPage.propTypes = {
  match: object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(DrinkMainPage);
